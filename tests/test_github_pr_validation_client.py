from __future__ import annotations

import io
import sys
import unittest
import urllib.error
from email.message import Message
from pathlib import Path
from unittest import mock


sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))

from github_pr_validation import GitHubClient  # noqa: E402


class FakeResponse:
    def __init__(self, payload: bytes, headers: dict[str, str] | None = None) -> None:
        self.payload = payload
        self.headers = headers or {}

    def __enter__(self) -> "FakeResponse":
        return self

    def __exit__(self, *args: object) -> None:
        return None

    def read(self) -> bytes:
        return self.payload


def forbidden_error(retry_after: str | None = None) -> urllib.error.HTTPError:
    headers = Message()
    if retry_after is not None:
        headers["Retry-After"] = retry_after
    return urllib.error.HTTPError(
        "https://api.github.com/repos/open-city-ai/haidian/pulls/1/files",
        403,
        "Forbidden",
        headers,
        io.BytesIO(b"rate limit exceeded"),
    )


class GitHubClientRetryTests(unittest.TestCase):
    def setUp(self) -> None:
        self.client = GitHubClient("token", "open-city-ai/haidian")

    def test_get_retries_transient_403_then_returns_response(self) -> None:
        with (
            mock.patch(
                "github_pr_validation.urllib.request.urlopen",
                side_effect=[forbidden_error("0"), FakeResponse(b'{"ok": true}')],
            ) as urlopen,
            mock.patch("github_pr_validation.time.sleep") as sleep,
        ):
            result, headers = self.client.request("GET", "/repos/open-city-ai/haidian/pulls/1/files")

        self.assertEqual({"ok": True}, result)
        self.assertEqual({}, headers)
        self.assertEqual(2, urlopen.call_count)
        sleep.assert_called_once_with(0.0)

    def test_get_stops_after_bounded_retries(self) -> None:
        error = forbidden_error()
        with (
            mock.patch("github_pr_validation.urllib.request.urlopen", side_effect=error) as urlopen,
            mock.patch("github_pr_validation.time.sleep") as sleep,
        ):
            with self.assertRaises(urllib.error.HTTPError):
                self.client.request("GET", "/repos/open-city-ai/haidian/pulls/1/files")

        self.assertEqual(4, urlopen.call_count)
        self.assertEqual([mock.call(1.0), mock.call(2.0), mock.call(4.0)], sleep.call_args_list)

    def test_mutating_request_does_not_retry_403(self) -> None:
        error = forbidden_error()
        with (
            mock.patch("github_pr_validation.urllib.request.urlopen", side_effect=error) as urlopen,
            mock.patch("github_pr_validation.time.sleep") as sleep,
        ):
            with self.assertRaises(urllib.error.HTTPError):
                self.client.request("POST", "/repos/open-city-ai/haidian/issues/1/comments", {})

        urlopen.assert_called_once()
        sleep.assert_not_called()


if __name__ == "__main__":
    unittest.main()
