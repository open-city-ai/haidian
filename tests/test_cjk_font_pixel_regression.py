from __future__ import annotations

import base64
import binascii
import os
import signal
import shutil
import subprocess
import sys
import tempfile
import time
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
FONT_FIXTURE = REPO_ROOT / "tests" / "fixtures" / "codex-cjk-fixture.ttf.b64"
FONT_FAMILY = "Codex CJK Fixture"
SAMPLE_GLYPHS = "一一一"
WINDOW_SIZE = "640,320"
GLYPH_CROP = (20, 20, 620, 200)
MIN_CHANGED_PIXELS = 500
MIN_CHANGED_FRACTION = 0.01
CHROMIUM_TIMEOUT_SECONDS = 60
PNG_SIGNATURE = b"\x89PNG\r\n\x1a\n"
PNG_TRAILER = b"\x00\x00\x00\x00IEND\xaeB`\x82"


def find_chromium() -> str | None:
    """Find a Chromium-compatible executable without requiring one in CI."""

    configured = os.environ.get("CHROMIUM_BIN")
    candidates = [configured] if configured else []
    candidates.extend(
        shutil.which(name)
        for name in (
            "chromium",
            "chromium-browser",
            "google-chrome",
            "google-chrome-stable",
            "chrome",
        )
    )
    candidates.extend(
        [
            "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
            "/Applications/Chromium.app/Contents/MacOS/Chromium",
            r"C:\Program Files\Google\Chrome\Application\chrome.exe",
            r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
        ]
    )
    local_app_data = os.environ.get("LOCALAPPDATA")
    if local_app_data:
        candidates.append(
            str(Path(local_app_data) / "Google" / "Chrome" / "Application" / "chrome.exe")
        )
    for candidate in candidates:
        if candidate and Path(candidate).is_file():
            return str(Path(candidate))
    return None


def fixture_base64() -> str:
    return "".join(
        line.strip()
        for line in FONT_FIXTURE.read_text(encoding="ascii").splitlines()
        if line.strip()
    )


def test_page(*, embedded: bool, font_payload: str) -> str:
    """Build a page that switches to the fixture only after it is ready."""

    if embedded:
        font_face = f"""
@font-face {{
  font-family: \"{FONT_FAMILY}\";
  src: url(\"data:font/ttf;base64,{font_payload}\") format(\"truetype\");
  font-style: normal;
  font-weight: 400;
  font-display: block;
}}
"""
        loaded_font_rule = f"""
html.font-loaded #glyph {{
  font-family: "{FONT_FAMILY}";
}}
"""
        settle_script = f"""
<script>
(async () => {{
  const face = '400 144px "{FONT_FAMILY}"';
  const text = {SAMPLE_GLYPHS!r};
  try {{
    const loadedFaces = await document.fonts.load(face, text);
    await document.fonts.ready;
    const ready = document.fonts.status === "loaded";
    const checked = document.fonts.check(face, text);
    const loaded =
      loadedFaces.length > 0 && loadedFaces.every((font) => font.status === "loaded");
    document.documentElement.dataset.fontsLoaded = String(loaded);
    document.documentElement.dataset.fontsReady = String(ready);
    document.documentElement.dataset.fontsCheck = String(checked);
    if (loaded && ready && checked) {{
      document.documentElement.classList.add("font-loaded");
    }}
    document.getElementById("status").textContent =
      `fonts.loaded=${{loaded}} fonts.ready=${{ready}} fonts.check=${{checked}}`;
  }} catch (error) {{
    document.documentElement.dataset.fontsLoaded = "false";
    document.documentElement.dataset.fontsReady = "false";
    document.documentElement.dataset.fontsCheck = "false";
    document.getElementById("status").textContent = "font loading failed";
  }}
  document.documentElement.classList.add("settled");
}})();
</script>
"""
    else:
        font_face = ""
        loaded_font_rule = ""
        settle_script = ""
    html_class = " class=\"settled\"" if not embedded else ""

    return f"""<!doctype html>
<html{html_class}>
<head>
<meta charset="utf-8">
<style>
{font_face}
html, body {{
  margin: 0;
  width: 640px;
  height: 320px;
  overflow: hidden;
  background: white;
}}
#stage {{
  padding: 20px;
  visibility: visible;
}}
html:not(.settled) #stage {{
  visibility: hidden;
}}
#glyph {{
  width: 600px;
  height: 180px;
  color: black;
  font-family: sans-serif;
  font-size: 144px;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  white-space: nowrap;
}}
{loaded_font_rule}
#status {{
  font-family: sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: #555;
}}
</style>
</head>
<body>
<main id="stage">
<div id="glyph">{SAMPLE_GLYPHS}</div>
<div id="status">fallback-only</div>
</main>
{settle_script}
</body>
</html>
"""


def screenshot_is_ready(path: Path) -> bool:
    """Return true only after Chromium has created a recognizable PNG."""

    try:
        if path.stat().st_size <= len(PNG_SIGNATURE) + len(PNG_TRAILER):
            return False
        with path.open("rb") as handle:
            if handle.read(len(PNG_SIGNATURE)) != PNG_SIGNATURE:
                return False
            handle.seek(-len(PNG_TRAILER), 2)
            return handle.read(len(PNG_TRAILER)) == PNG_TRAILER
    except OSError:
        return False


def terminate_process_tree(
    process: subprocess.Popen[str], *, process_group_id: int | None = None
) -> tuple[str, str]:
    """Force-stop Chromium's isolated process tree before collecting output."""

    if os.name != "nt" and process_group_id is None:
        try:
            process_group_id = os.getpgid(process.pid)
        except ProcessLookupError:
            pass

    def signal_tree() -> None:
        if os.name == "nt":
            try:
                result = subprocess.run(
                    ["taskkill", "/PID", str(process.pid), "/T", "/F"],
                    capture_output=True,
                    text=True,
                    encoding="utf-8",
                    errors="replace",
                    check=False,
                    timeout=5,
                )
                if result.returncode == 0:
                    return
            except (OSError, subprocess.TimeoutExpired):
                pass
        elif process_group_id is not None:
            try:
                os.killpg(process_group_id, signal.SIGKILL)
                return
            except (OSError, ProcessLookupError):
                pass
        try:
            process.kill()
        except ProcessLookupError:
            pass

    if process.poll() is None:
        # These browser processes are isolated for this test. Killing only the
        # parent can leave renderer descendants holding captured pipe handles.
        signal_tree()

    try:
        stdout, stderr = process.communicate(timeout=5)
    except subprocess.TimeoutExpired as exc:
        signal_tree()
        try:
            return process.communicate(timeout=5)
        except subprocess.TimeoutExpired as killed_exc:
            stdout = killed_exc.stdout or exc.stdout or ""
            stderr = killed_exc.stderr or exc.stderr or ""
            if isinstance(stdout, bytes):
                stdout = stdout.decode("utf-8", errors="replace")
            if isinstance(stderr, bytes):
                stderr = stderr.decode("utf-8", errors="replace")
            return stdout, stderr
    return stdout or "", stderr or ""


def run_chromium(
    executable: str,
    source: Path,
    profile: Path,
    *,
    screenshot: Path,
) -> subprocess.CompletedProcess[str]:
    command = [
        executable,
        "--headless",
        "--disable-gpu",
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "--hide-scrollbars",
        "--no-first-run",
        "--no-default-browser-check",
        "--run-all-compositor-stages-before-draw",
        "--virtual-time-budget=3000",
        "--force-device-scale-factor=1",
        f"--window-size={WINDOW_SIZE}",
        f"--user-data-dir={profile}",
    ]
    command.append(f"--screenshot={screenshot}")
    command.append(source.resolve().as_uri())

    popen_options: dict[str, object] = {
        "stdout": subprocess.DEVNULL,
        "stderr": subprocess.DEVNULL,
        "text": True,
        "encoding": "utf-8",
        "errors": "replace",
    }
    if os.name == "nt":
        popen_options["creationflags"] = subprocess.CREATE_NEW_PROCESS_GROUP
    else:
        popen_options["start_new_session"] = True

    process = subprocess.Popen(command, **popen_options)
    process_group_id = process.pid if os.name != "nt" else None
    try:
        deadline = time.monotonic() + CHROMIUM_TIMEOUT_SECONDS
        while process.poll() is None:
            if screenshot_is_ready(screenshot):
                stdout, stderr = terminate_process_tree(
                    process, process_group_id=process_group_id
                )
                note = "Chromium was terminated after the complete screenshot was verified."
                stderr = f"{stderr}\n{note}" if stderr else note
                return subprocess.CompletedProcess(command, 0, stdout, stderr)
            if time.monotonic() >= deadline:
                stdout, stderr = terminate_process_tree(
                    process, process_group_id=process_group_id
                )
                note = "Chromium did not produce a complete screenshot before timeout"
                stderr = f"{note}\n{stderr}" if stderr else note
                return subprocess.CompletedProcess(command, 124, stdout, stderr)
            time.sleep(0.1)

        stdout, stderr = process.communicate()
        if not screenshot_is_ready(screenshot):
            note = "Chromium exited without producing a complete screenshot"
            stderr = f"{note}\n{stderr}" if stderr else note
            return subprocess.CompletedProcess(
                command, process.returncode or 1, stdout, stderr
            )
        return subprocess.CompletedProcess(command, process.returncode, stdout, stderr)
    finally:
        if process.poll() is None:
            terminate_process_tree(process, process_group_id=process_group_id)


class CjkFontPixelRegressionTests(unittest.TestCase):
    def test_terminate_process_tree_kills_pipe_holding_descendant(self) -> None:
        child_code = (
            "import pathlib, sys, time; "
            "time.sleep(1); "
            "pathlib.Path(sys.argv[1]).write_text('survived', encoding='ascii'); "
            "time.sleep(60)"
        )
        parent_code = (
            "import pathlib, subprocess, sys, time; "
            "child = subprocess.Popen([sys.executable, '-c', "
            + repr(child_code)
            + ", sys.argv[1], sys.argv[2]]); "
            "pathlib.Path(sys.argv[2]).write_text(str(child.pid), encoding='ascii'); "
            "time.sleep(60)"
        )

        with tempfile.TemporaryDirectory() as raw:
            root = Path(raw)
            survivor_marker = root / "survivor.txt"
            child_pid_file = root / "child.pid"
            popen_options: dict[str, object] = {
                "stdout": subprocess.PIPE,
                "stderr": subprocess.PIPE,
                "text": True,
                "encoding": "utf-8",
                "errors": "replace",
            }
            process_group_id: int | None = None
            if os.name == "nt":
                popen_options["creationflags"] = subprocess.CREATE_NEW_PROCESS_GROUP
            else:
                popen_options["start_new_session"] = True

            process = subprocess.Popen(
                [
                    sys.executable,
                    "-c",
                    parent_code,
                    str(survivor_marker),
                    str(child_pid_file),
                ],
                **popen_options,
            )
            process_group_id = process.pid if os.name != "nt" else None
            try:
                deadline = time.monotonic() + 5
                while not child_pid_file.is_file():
                    if process.poll() is not None:
                        self.fail("test parent exited before reporting its child")
                    if time.monotonic() >= deadline:
                        self.fail("test child did not start in time")
                    time.sleep(0.05)

                started = time.monotonic()
                terminate_process_tree(process, process_group_id=process_group_id)
                self.assertLess(
                    time.monotonic() - started,
                    5,
                    "process-tree cleanup must remain bounded",
                )
                self.assertIsNotNone(process.poll())

                deadline = time.monotonic() + 2
                while time.monotonic() < deadline and not survivor_marker.exists():
                    time.sleep(0.05)
                self.assertFalse(
                    survivor_marker.exists(),
                    "a descendant holding the captured pipe survived cleanup",
                )
            finally:
                if process.poll() is None:
                    terminate_process_tree(process, process_group_id=process_group_id)

    def test_embedded_cjk_font_is_loaded_and_changes_chromium_pixels(self) -> None:
        executable = find_chromium()
        if executable is None:
            self.skipTest("Chromium is unavailable")
        try:
            from PIL import Image, ImageChops
        except ImportError:  # pragma: no cover - Pillow is a review dependency.
            self.skipTest("Pillow unavailable")

        payload = fixture_base64()
        try:
            font_bytes = base64.b64decode(payload, validate=True)
        except (ValueError, binascii.Error) as exc:
            self.fail(f"invalid base64 font fixture: {exc}")
        self.assertGreater(len(font_bytes), 0, "font fixture must not be empty")
        self.assertLess(len(font_bytes), 4096, "font fixture should remain tiny")

        with tempfile.TemporaryDirectory() as raw:
            root = Path(raw)
            embedded_html = root / "embedded.html"
            fallback_html = root / "fallback.html"
            embedded_png = root / "embedded.png"
            fallback_png = root / "fallback.png"
            embedded_html.write_text(
                test_page(embedded=True, font_payload=payload), encoding="utf-8"
            )
            fallback_html.write_text(
                test_page(embedded=False, font_payload=""), encoding="utf-8"
            )

            embedded_screenshot_run = run_chromium(
                executable,
                embedded_html,
                root / "chrome-profile-embedded-screenshot",
                screenshot=embedded_png,
            )
            self.assertEqual(
                0,
                embedded_screenshot_run.returncode,
                embedded_screenshot_run.stderr[-2000:]
                or embedded_screenshot_run.stdout[-2000:],
            )
            self.assertTrue(
                screenshot_is_ready(embedded_png),
                "Chromium did not write a complete screenshot",
            )
            fallback_run = run_chromium(
                executable,
                fallback_html,
                root / "chrome-profile-fallback",
                screenshot=fallback_png,
            )
            self.assertEqual(
                0,
                fallback_run.returncode,
                fallback_run.stderr[-2000:] or fallback_run.stdout[-2000:],
            )
            self.assertTrue(
                screenshot_is_ready(fallback_png),
                "Chromium did not write a complete screenshot",
            )

            with Image.open(embedded_png) as embedded_image, Image.open(
                fallback_png
            ) as fallback_image:
                self.assertEqual(embedded_image.size, fallback_image.size)
                embedded_crop = embedded_image.convert("RGB").crop(GLYPH_CROP)
                fallback_crop = fallback_image.convert("RGB").crop(GLYPH_CROP)
                diff = ImageChops.difference(embedded_crop, fallback_crop)
                changed_pixels = sum(diff.convert("L").histogram()[17:])

            crop_pixels = (GLYPH_CROP[2] - GLYPH_CROP[0]) * (
                GLYPH_CROP[3] - GLYPH_CROP[1]
            )
            self.assertGreater(
                changed_pixels,
                MIN_CHANGED_PIXELS,
                "embedded and fallback glyphs are unexpectedly identical",
            )
            self.assertGreater(
                changed_pixels / crop_pixels,
                MIN_CHANGED_FRACTION,
                "pixel difference is below the regression threshold",
            )


if __name__ == "__main__":
    unittest.main()
