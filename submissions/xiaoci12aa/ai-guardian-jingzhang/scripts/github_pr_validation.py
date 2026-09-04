#!/usr/bin/env python3
"""
GitHub PR Validation Script for OpenCity AI Urban Design Submissions.

Validates that pull requests to the open-city-ai/haidian repository conform
to the submission format requirements defined in SKILL.md:
  - Directory structure: submissions/{agent}/{submission_id}/
  - Required manifest.json with valid structure
  - All required files present and valid
  - GeoJSON geometry validity
  - Compliance matrices completeness
  - Proposal content and evidence markers

Usage:
    python3 scripts/github_pr_validation.py

Environment variables:
    GITHUB_TOKEN            - GitHub API token for PR interactions
    MAINTAINER_BYPASS_LOGINS - Comma-separated list of maintainer logins
"""

import json
import os
import re
import sys
import hashlib
import traceback
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

# --- Constants ---

REPO_ROOT = Path(os.environ.get("GITHUB_WORKSPACE", Path(__file__).resolve().parent.parent))

REQUIRED_SUBMISSION_FILES = [
    "manifest.json",
    "proposal.md",
    "metrics.json",
    "compliance_matrix.json",
    "standard_matrix.json",
    "design_depth_matrix.json",
    "self_check.json",
    "agent.json",
    "sources.json",
    "assumptions.json",
    "copyright_statement.md",
    "changelog.md",
]

REQUIRED_GEOMETRY_FILES = [
    "geometry/site_boundary.geojson",
    "geometry/key_areas.geojson",
    "geometry/land_use.geojson",
    "geometry/buildings.geojson",
    "geometry/roads.geojson",
    "geometry/green_space.geojson",
    "geometry/public_space.geojson",
    "geometry/phasing.geojson",
]

REQUIRED_FIGURE_FILES = [
    "assets/figures/figure_01_location_map.svg",
    "assets/figures/figure_02_master_plan.svg",
    "assets/figures/figure_03_spatial_structure.svg",
    "assets/figures/figure_04_key_area_design.svg",
    "assets/figures/figure_05_sustainability.svg",
]

OPTIONAL_VISUAL_FILES = [
    "visual/index.html",
    "report/proposal.html",
]

MAX_FILE_SIZE_BYTES = 200 * 1024 * 1024  # 200 MB total
MAX_INDIVIDUAL_FILE_SIZE = 50 * 1024 * 1024  # 50 MB per file

MANIFEST_REQUIRED_KEYS = [
    "manifest_version",
    "submission_id",
    "project",
    "design_name",
    "submission_date",
    "team",
    "license",
    "site_area_declared_sqm",
    "files",
    "total_files",
    "total_size_bytes",
    "required_checks",
    "design_summary",
]

COMPLIANCE_REQUIRED_KEYS = ["project_id", "matrix_type", "items", "summary"]
STANDARD_REQUIRED_KEYS = ["project_id", "matrix_type", "standards_referenced", "summary"]
DEPTH_REQUIRED_KEYS = ["project_id", "matrix_type", "assessment_items", "overall_completeness"]
SELF_CHECK_REQUIRED_KEYS = ["project_id", "check_timestamp", "check_results", "summary"]

# --- Result tracking ---

class ValidationResult:
    def __init__(self):
        self.errors: List[str] = []
        self.warnings: List[str] = []
        self.passed: List[str] = []

    def error(self, msg: str) -> None:
        self.errors.append(msg)

    def warning(self, msg: str) -> None:
        self.warnings.append(msg)

    def ok(self, msg: str) -> None:
        self.passed.append(msg)

    def has_errors(self) -> bool:
        return len(self.errors) > 0

    def print_summary(self) -> int:
        total = len(self.errors) + len(self.warnings) + len(self.passed)
        print(f"\n{'='*60}")
        print(f"VALIDATION SUMMARY")
        print(f"{'='*60}")
        print(f"  Total checks : {total}")
        print(f"  Passed       : {len(self.passed)}")
        print(f"  Warnings     : {len(self.warnings)}")
        print(f"  Errors       : {len(self.errors)}")

        if self.errors:
            print(f"\n--- ERRORS ({len(self.errors)}) ---")
            for e in self.errors:
                print(f"  [ERROR]   {e}")
        if self.warnings:
            print(f"\n--- WARNINGS ({len(self.warnings)}) ---")
            for w in self.warnings:
                print(f"  [WARNING] {w}")
        if self.passed:
            print(f"\n--- PASSED ({len(self.passed)}) ---")
            for p in self.passed:
                print(f"  [PASS]    {p}")

        print(f"\n{'='*60}")
        if self.errors:
            print("STATUS: FAILED")
            return 1
        else:
            print("STATUS: PASSED")
            return 0


# --- Helper functions ---

def find_submissions() -> List[Path]:
    """Find all submission directories under submissions/."""
    subs_dir = REPO_ROOT / "submissions"
    if not subs_dir.exists():
        return []
    submissions = []
    for agent_dir in subs_dir.iterdir():
        if agent_dir.is_dir() and not agent_dir.name.startswith("."):
            for sub_dir in agent_dir.iterdir():
                if sub_dir.is_dir() and not sub_dir.name.startswith("."):
                    if (sub_dir / "manifest.json").exists():
                        submissions.append(sub_dir)
    return submissions


def get_changed_files() -> List[str]:
    """Get list of changed files from the PR event payload."""
    event_path = os.environ.get("GITHUB_EVENT_PATH")
    if event_path and Path(event_path).exists():
        with open(event_path, "r", encoding="utf-8") as f:
            event = json.load(f)
        # Try to get changed files from the event
        changed = []
        # For pull_request events
        if "pull_request" in event:
            pr = event["pull_request"]
            # Check for changed files in the PR body context
            changed.extend(_extract_file_paths_from_event(event))
        return changed
    return []


def _extract_file_paths_from_event(event: dict) -> List[str]:
    """Extract changed file paths from GitHub event."""
    paths = []
    # Check for commits
    if "commits" in event:
        for commit in event["commits"]:
            for f in commit.get("added", []) + commit.get("modified", []):
                paths.append(f)
    # Check for head_commit
    if "head_commit" in event:
        for f in event["head_commit"].get("added", []) + event["head_commit"].get("modified", []):
            paths.append(f)
    return list(set(paths))


def is_maintainer_bypass() -> bool:
    """Check if the PR author is in the maintainer bypass list."""
    bypass_logins = os.environ.get("MAINTAINER_BYPASS_LOGINS", "")
    if not bypass_logins:
        return False

    event_path = os.environ.get("GITHUB_EVENT_PATH")
    if event_path and Path(event_path).exists():
        with open(event_path, "r", encoding="utf-8") as f:
            event = json.load(f)
        author = (
            event.get("pull_request", {}).get("user", {}).get("login", "")
            or event.get("sender", {}).get("login", "")
            or event.get("head_commit", {}).get("author", {}).get("username", "")
        )
        bypass_set = {x.strip().lower() for x in bypass_logins.split(",") if x.strip()}
        if author.lower() in bypass_set:
            print(f"[INFO] PR author '{author}' is in maintainer bypass list. "
                  f"Some checks may be relaxed.")
            return True
    return False


def validate_json_file(filepath: Path, result: ValidationResult) -> Optional[dict]:
    """Validate that a file is valid JSON and return parsed data."""
    if not filepath.exists():
        result.error(f"Missing file: {filepath.relative_to(REPO_ROOT)}")
        return None
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data
    except json.JSONDecodeError as e:
        result.error(f"Invalid JSON in {filepath.relative_to(REPO_ROOT)}: {e}")
        return None
    except Exception as e:
        result.error(f"Error reading {filepath.relative_to(REPO_ROOT)}: {e}")
        return None


def validate_geojson(filepath: Path, result: ValidationResult) -> bool:
    """Validate a GeoJSON file."""
    data = validate_json_file(filepath, result)
    if data is None:
        return False

    rel_path = filepath.relative_to(REPO_ROOT)

    if not isinstance(data, dict):
        result.error(f"{rel_path}: not a GeoJSON object")
        return False

    if data.get("type") != "FeatureCollection":
        result.error(f"{rel_path}: type must be 'FeatureCollection', got '{data.get('type')}'")
        return False

    features = data.get("features", [])
    if not isinstance(features, list):
        result.error(f"{rel_path}: 'features' must be an array")
        return False

    if len(features) == 0:
        result.warning(f"{rel_path}: FeatureCollection has no features")
        return True

    for i, feature in enumerate(features):
        if not isinstance(feature, dict):
            result.error(f"{rel_path}: features[{i}] is not an object")
            continue
        if feature.get("type") != "Feature":
            result.error(f"{rel_path}: features[{i}].type must be 'Feature'")
        if "geometry" not in feature:
            result.error(f"{rel_path}: features[{i}] missing 'geometry'")
        else:
            geom = feature["geometry"]
            if geom is None:
                continue
            if "type" not in geom:
                result.error(f"{rel_path}: features[{i}].geometry missing 'type'")
            if "coordinates" not in geom:
                result.error(f"{rel_path}: features[{i}].geometry missing 'coordinates'")

    result.ok(f"GeoJSON valid: {rel_path} ({len(features)} features)")
    return True


# --- Validation functions ---

def check_submission_structure(sub_dir: Path, result: ValidationResult) -> None:
    """Check directory structure and required files."""
    rel_dir = sub_dir.relative_to(REPO_ROOT)

    # Check all required files
    for req_file in REQUIRED_SUBMISSION_FILES:
        fpath = sub_dir / req_file
        if fpath.exists():
            result.ok(f"File present: {rel_dir}/{req_file}")
        else:
            result.error(f"Missing required file: {rel_dir}/{req_file}")

    # Check geometry files
    for geo_file in REQUIRED_GEOMETRY_FILES:
        fpath = sub_dir / geo_file
        if fpath.exists():
            result.ok(f"Geometry present: {rel_dir}/{geo_file}")
        else:
            result.error(f"Missing geometry file: {rel_dir}/{geo_file}")

    # Check figure files
    for fig_file in REQUIRED_FIGURE_FILES:
        fpath = sub_dir / fig_file
        if fpath.exists():
            result.ok(f"Figure present: {rel_dir}/{fig_file}")
        else:
            result.error(f"Missing figure file: {rel_dir}/{fig_file}")


def check_manifest(sub_dir: Path, result: ValidationResult) -> Optional[dict]:
    """Validate manifest.json structure and content."""
    manifest = validate_json_file(sub_dir / "manifest.json", result)
    if manifest is None:
        return None

    rel_dir = sub_dir.relative_to(REPO_ROOT)

    # Check required keys
    missing_keys = [k for k in MANIFEST_REQUIRED_KEYS if k not in manifest]
    if missing_keys:
        result.error(f"{rel_dir}/manifest.json: missing required keys: {missing_keys}")
    else:
        result.ok(f"Manifest has all required keys ({len(MANIFEST_REQUIRED_KEYS)})")

    # Validate manifest_version
    version = manifest.get("manifest_version", "")
    if not version:
        result.error("manifest.json: manifest_version is empty")
    elif not re.match(r"^\d+\.\d+\.\d+$", str(version)):
        result.warning(f"manifest.json: manifest_version '{version}' not in semver format")

    # Validate submission_id
    sub_id = manifest.get("submission_id", "")
    if not sub_id:
        result.error("manifest.json: submission_id is empty")
    elif sub_id != sub_dir.name:
        result.warning(
            f"manifest.json: submission_id '{sub_id}' does not match "
            f"directory name '{sub_dir.name}'"
        )
    else:
        result.ok(f"submission_id matches directory: {sub_id}")

    # Validate files array
    files = manifest.get("files", [])
    if not isinstance(files, list):
        result.error("manifest.json: 'files' must be an array")
    elif len(files) == 0:
        result.error("manifest.json: 'files' array is empty")
    else:
        result.ok(f"Manifest lists {len(files)} files")
        declared_paths = set()
        for i, f in enumerate(files):
            if not isinstance(f, dict):
                result.error(f"manifest.json: files[{i}] is not an object")
                continue
            fpath = f.get("path", "")
            if not fpath:
                result.error(f"manifest.json: files[{i}] missing 'path'")
            else:
                declared_paths.add(fpath)
                actual_path = sub_dir / fpath
                if not actual_path.exists():
                    result.error(
                        f"manifest.json: file '{fpath}' declared but not found on disk"
                    )

        # Check declared file count matches
        declared_count = manifest.get("total_files", 0)
        if declared_count != len(files):
            result.warning(
                f"manifest.json: total_files={declared_count} but files array has {len(files)} entries"
            )

    # Validate required_checks
    checks = manifest.get("required_checks", {})
    if not isinstance(checks, dict):
        result.error("manifest.json: 'required_checks' must be an object")
    else:
        expected_checks = [
            "site_boundary_present", "metrics_present", "proposal_present",
            "compliance_matrix_present", "all_geometry_non_overlapping",
            "coordinate_system_declared", "boundary_status_declared",
            "figures_present", "evidence_markers_in_proposal",
            "offline_visualization_present",
        ]
        for check_key in expected_checks:
            if check_key not in checks:
                result.warning(
                    f"manifest.json: required_checks missing '{check_key}'"
                )

    # Validate design_summary
    summary = manifest.get("design_summary", {})
    if not isinstance(summary, dict):
        result.error("manifest.json: 'design_summary' must be an object")
    elif not summary:
        result.warning("manifest.json: design_summary is empty")

    return manifest


def check_matrix_files(sub_dir: Path, result: ValidationResult) -> None:
    """Validate compliance, standard, and design depth matrices."""
    rel_dir = sub_dir.relative_to(REPO_ROOT)

    # Compliance matrix
    cm = validate_json_file(sub_dir / "compliance_matrix.json", result)
    if cm:
        missing = [k for k in COMPLIANCE_REQUIRED_KEYS if k not in cm]
        if missing:
            result.error(f"compliance_matrix.json: missing keys: {missing}")
        items = cm.get("items", [])
        if not isinstance(items, list) or len(items) == 0:
            result.error("compliance_matrix.json: 'items' must be a non-empty array")
        else:
            result.ok(f"Compliance matrix: {len(items)} items")
            partial = sum(1 for i in items if i.get("compliance_status") == "partial")
            non_compliant = sum(1 for i in items if i.get("compliance_status") == "non_compliant")
            if non_compliant > 0:
                result.error(f"Compliance matrix: {non_compliant} non-compliant items")
            if partial > 0:
                result.warning(f"Compliance matrix: {partial} partially-compliant items")

    # Standard matrix
    sm = validate_json_file(sub_dir / "standard_matrix.json", result)
    if sm:
        missing = [k for k in STANDARD_REQUIRED_KEYS if k not in sm]
        if missing:
            result.error(f"standard_matrix.json: missing keys: {missing}")
        standards = sm.get("standards_referenced", [])
        if not isinstance(standards, list) or len(standards) == 0:
            result.error("standard_matrix.json: 'standards_referenced' must be a non-empty array")
        else:
            result.ok(f"Standard matrix: {len(standards)} standards referenced")

    # Design depth matrix
    dm = validate_json_file(sub_dir / "design_depth_matrix.json", result)
    if dm:
        missing = [k for k in DEPTH_REQUIRED_KEYS if k not in dm]
        if missing:
            result.error(f"design_depth_matrix.json: missing keys: {missing}")
        items = dm.get("assessment_items", [])
        if not isinstance(items, list) or len(items) == 0:
            result.error("design_depth_matrix.json: 'assessment_items' must be a non-empty array")
        else:
            result.ok(f"Design depth matrix: {len(items)} assessment items")
        completeness = dm.get("overall_completeness", 0)
        if not isinstance(completeness, (int, float)) or not (0 <= completeness <= 1):
            result.error(
                f"design_depth_matrix.json: overall_completeness must be 0-1, got {completeness}"
            )

    # Self-check
    sc = validate_json_file(sub_dir / "self_check.json", result)
    if sc:
        missing = [k for k in SELF_CHECK_REQUIRED_KEYS if k not in sc]
        if missing:
            result.error(f"self_check.json: missing keys: {missing}")
        summary = sc.get("summary", {})
        if summary:
            failed = summary.get("failed", 0)
            if failed > 0:
                result.error(f"self_check.json: {failed} self-check(s) failed")
            result.ok(
                f"Self-check: {summary.get('passed',0)} passed, "
                f"{summary.get('warnings',0)} warnings, "
                f"{summary.get('failed',0)} failed"
            )


def check_proposal_content(sub_dir: Path, result: ValidationResult) -> None:
    """Check proposal.md for required structure and evidence markers."""
    proposal_path = sub_dir / "proposal.md"
    if not proposal_path.exists():
        result.error("proposal.md not found")
        return

    with open(proposal_path, "r", encoding="utf-8") as f:
        content = f.read()

    rel_path = proposal_path.relative_to(REPO_ROOT)

    # Check for evidence markers
    evidence_pattern = re.compile(r'\[EVIDENCE:\s*([^\]]+)\]')
    evidence_matches = evidence_pattern.findall(content)
    if evidence_matches:
        result.ok(f"Evidence markers found: {len(evidence_matches)} in proposal.md")
    else:
        result.warning("No [EVIDENCE: ...] markers found in proposal.md")

    # Check for chapter structure
    chapter_pattern = re.compile(r'^#{1,3}\s+', re.MULTILINE)
    chapters = chapter_pattern.findall(content)
    if len(chapters) >= 5:
        result.ok(f"Proposal has {len(chapters)} sections (>=5 required)")
    else:
        result.warning(f"Proposal has only {len(chapters)} sections (5+ recommended)")

    # Check minimum content length
    if len(content) >= 5000:
        result.ok(f"Proposal content length: {len(content)} chars (>=5000)")
    else:
        result.warning(f"Proposal content length: {len(content)} chars (<5000 recommended)")


def check_geometry_validity(sub_dir: Path, result: ValidationResult) -> None:
    """Validate all GeoJSON geometry files."""
    for geo_file in REQUIRED_GEOMETRY_FILES:
        fpath = sub_dir / geo_file
        if fpath.exists():
            validate_geojson(fpath, result)


def check_file_sizes(sub_dir: Path, result: ValidationResult) -> None:
    """Check total and individual file sizes against limits."""
    total_size = 0
    oversized_files = []

    for root, dirs, files in os.walk(sub_dir):
        for fname in files:
            fpath = Path(root) / fname
            try:
                size = fpath.stat().st_size
                total_size += size
                if size > MAX_INDIVIDUAL_FILE_SIZE:
                    oversized_files.append(
                        (fpath.relative_to(sub_dir), size)
                    )
            except OSError:
                continue

    if total_size > MAX_FILE_SIZE_BYTES:
        result.error(
            f"Total size {total_size:,} bytes exceeds limit "
            f"({MAX_FILE_SIZE_BYTES:,} bytes)"
        )
    else:
        result.ok(
            f"Total size: {total_size:,} bytes (limit: {MAX_FILE_SIZE_BYTES:,})"
        )

    if oversized_files:
        for fname, size in oversized_files:
            result.error(
                f"File too large: {fname} ({size:,} bytes, "
                f"limit: {MAX_INDIVIDUAL_FILE_SIZE:,})"
            )


def check_manifest_hashes(sub_dir: Path, manifest: dict, result: ValidationResult) -> None:
    """Verify file hashes declared in manifest match actual files."""
    if manifest is None:
        return

    files = manifest.get("files", [])
    hash_mismatches = 0
    hash_matches = 0

    for f_entry in files:
        fpath_str = f_entry.get("path", "")
        declared_hash = f_entry.get("sha256", "").upper()
        if not fpath_str or not declared_hash:
            continue

        actual_path = sub_dir / fpath_str
        if not actual_path.exists():
            continue

        try:
            with open(actual_path, "rb") as f:
                actual_hash = hashlib.sha256(f.read()).hexdigest().upper()
        except OSError:
            continue

        if declared_hash != actual_hash:
            result.error(
                f"SHA256 mismatch for {fpath_str}: "
                f"declared={declared_hash[:16]}..., "
                f"actual={actual_hash[:16]}..."
            )
            hash_mismatches += 1
        else:
            hash_matches += 1

    if hash_matches > 0:
        result.ok(f"SHA256 hashes verified: {hash_matches} matched")
    if hash_mismatches > 0:
        result.error(f"SHA256 hashes mismatched: {hash_mismatches}")


# --- Main ---

def validate_submission(sub_dir: Path, result: ValidationResult) -> None:
    """Run all validation checks on a single submission directory."""
    rel_dir = sub_dir.relative_to(REPO_ROOT)
    print(f"\n--- Validating: {rel_dir} ---")

    check_submission_structure(sub_dir, result)
    manifest = check_manifest(sub_dir, result)
    check_matrix_files(sub_dir, result)
    check_proposal_content(sub_dir, result)
    check_geometry_validity(sub_dir, result)
    check_file_sizes(sub_dir, result)
    check_manifest_hashes(sub_dir, manifest, result)


def main() -> int:
    """Main entry point."""
    print(f"OpenCity AI Submission PR Validation")
    print(f"Repository root: {REPO_ROOT}")
    print(f"Python version: {sys.version}")

    bypass = is_maintainer_bypass()
    if bypass:
        print("[INFO] Maintainer bypass active — hash mismatches will be warnings only.")

    result = ValidationResult()

    # Find submissions
    submissions = find_submissions()

    if not submissions:
        # Check if there are changed files that might indicate a new submission
        changed_files = get_changed_files()
        if changed_files:
            print(f"Changed files detected: {len(changed_files)}")
            # Try to identify submission directories from changed files
            sub_dirs = set()
            for cf in changed_files:
                if cf.startswith("submissions/"):
                    parts = cf.split("/")
                    if len(parts) >= 3:
                        sub_dirs.add(Path(REPO_ROOT, "/".join(parts[:3])))
            submissions = list(sub_dirs)

    if not submissions:
        result.warning(
            "No submission directories found under submissions/. "
            "If this is not a submission PR, this is expected."
        )
        # Don't fail — some PRs may not contain submissions
        result.print_summary()
        return 0

    print(f"Found {len(submissions)} submission(s) to validate")

    for sub_dir in submissions:
        if sub_dir.exists():
            validate_submission(sub_dir, result)
        else:
            result.error(f"Submission directory not found: {sub_dir}")

    return result.print_summary()


if __name__ == "__main__":
    try:
        exit_code = main()
        sys.exit(exit_code)
    except Exception as e:
        print(f"\nFATAL ERROR: {e}")
        traceback.print_exc()
        sys.exit(1)