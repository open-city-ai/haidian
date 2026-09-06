from __future__ import annotations

import email.message
import unittest
from unittest import mock
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

import fetch_standard_references as fetcher  # noqa: E402


class FakeResponse:
    def __init__(
        self,
        body: bytes,
        url: str = "https://example.com/final",
        content_length: str | None = None,
    ) -> None:
        self.body = body
        self.url = url
        self.headers = email.message.Message()
        self.headers["content-type"] = "text/html; charset=utf-8"
        if content_length is not None:
            self.headers["content-length"] = content_length
        self.read_sizes: list[int] = []

    def __enter__(self):
        return self

    def __exit__(self, *args):
        return None

    def close(self) -> None:
        pass

    def geturl(self) -> str:
        return self.url

    def read(self, size: int) -> bytes:
        self.read_sizes.append(size)
        return self.body[:size]


class RedirectBody:
    def read(self, *args):
        raise AssertionError("redirect response body must not be read")

    def close(self) -> None:
        pass


def redirect_error(source: str, location: str):
    headers = email.message.Message()
    headers["location"] = location
    return fetcher.urllib.error.HTTPError(source, 302, "Found", headers, RedirectBody())


class FetchStandardReferenceNetworkBoundsTests(unittest.TestCase):
    def test_initial_non_http_schemes_are_rejected_without_opening(self) -> None:
        for url in ("file:///tmp/private.html", "data:text/html,private"):
            with self.subTest(url=url), mock.patch.object(
                fetcher.urllib.request.OpenerDirector, "open"
            ) as open_request:
                result = fetcher.fetch_url(url, 1)

            self.assertFalse(result.ok)
            self.assertEqual("unsupported_url_scheme", result.status)
            open_request.assert_not_called()

    def test_redirect_body_is_not_read_and_relative_target_is_followed(self) -> None:
        final = FakeResponse(b"<p>official</p>", "https://example.com/final")
        with mock.patch.object(
            fetcher.urllib.request.OpenerDirector,
            "open",
            side_effect=[redirect_error("https://example.com/start", "/final"), final],
        ) as open_request:
            result = fetcher.fetch_url("https://example.com/start", 1)

        self.assertTrue(result.ok)
        self.assertEqual("https://example.com/final", open_request.call_args_list[1].args[0].full_url)
        self.assertEqual([fetcher.MAX_RESPONSE_BYTES + 1], final.read_sizes)

    def test_redirect_to_non_http_scheme_is_rejected_before_second_request(self) -> None:
        with mock.patch.object(
            fetcher.urllib.request.OpenerDirector,
            "open",
            side_effect=[redirect_error("https://example.com/start", "file:///tmp/private")],
        ) as open_request:
            result = fetcher.fetch_url("https://example.com/start", 1)

        self.assertFalse(result.ok)
        self.assertEqual("unsupported_url_scheme", result.status)
        self.assertEqual(1, open_request.call_count)

    def test_redirect_limit_is_enforced(self) -> None:
        redirects = [
            redirect_error(f"https://example.com/{index}", f"/{index + 1}")
            for index in range(fetcher.MAX_REDIRECTS + 1)
        ]
        with mock.patch.object(
            fetcher.urllib.request.OpenerDirector, "open", side_effect=redirects
        ):
            result = fetcher.fetch_url("https://example.com/0", 1)

        self.assertFalse(result.ok)
        self.assertEqual("too_many_redirects", result.status)

    def test_actual_response_size_boundary_is_enforced(self) -> None:
        for extra, ok in ((0, True), (1, False)):
            with self.subTest(extra=extra):
                response = FakeResponse(b"x" * (fetcher.MAX_RESPONSE_BYTES + extra))
                with mock.patch.object(
                    fetcher.urllib.request.OpenerDirector, "open", return_value=response
                ):
                    result = fetcher.fetch_url("https://example.com/start", 1)

                self.assertEqual(ok, result.ok)
                self.assertEqual(
                    "fetched" if ok else "response_too_large", result.status
                )

    def test_oversized_content_length_fails_before_reading(self) -> None:
        response = FakeResponse(
            b"small", content_length=str(fetcher.MAX_RESPONSE_BYTES + 1)
        )
        with mock.patch.object(
            fetcher.urllib.request.OpenerDirector, "open", return_value=response
        ):
            result = fetcher.fetch_url("https://example.com/start", 1)

        self.assertFalse(result.ok)
        self.assertEqual("response_too_large", result.status)
        self.assertEqual([], response.read_sizes)


if __name__ == "__main__":
    unittest.main()
