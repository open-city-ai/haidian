#!/usr/bin/env python3
"""Audit submission manifests against the published manifest schema.

By default this is an advisory corpus audit. Pass ``--strict`` when the caller
wants a non-zero exit status for any invalid selected manifest. The pull-request
validator separately applies the migration boundary for new packages.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from manifest_schema import legacy_role_findings, manifest_paths, schema_errors


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--repo-root", default=".")
    parser.add_argument("--manifest", action="append", dest="manifests")
    parser.add_argument("--all", action="store_true", help="audit every submissions/*/*/manifest.json")
    parser.add_argument("--strict", action="store_true", help="fail when any selected manifest is invalid")
    parser.add_argument("--json", action="store_true")
    args = parser.parse_args()

    repo_root = Path(args.repo_root).resolve()
    if args.all or not args.manifests:
        paths = manifest_paths(repo_root)
    else:
        paths = [(repo_root / item).resolve() for item in args.manifests]
    selection_error = None
    if not paths:
        selection_error = (
            f"no submission manifests found under {repo_root}; "
            "check --repo-root and sparse checkout configuration"
        )

    results = []
    for path in paths:
        manifest = None
        try:
            manifest = json.loads(path.read_text(encoding="utf-8"))
        except (OSError, UnicodeDecodeError, json.JSONDecodeError) as exc:
            errors = [f"unable to read manifest: {exc}"]
        else:
            if not isinstance(manifest, dict):
                errors = ["<root>: manifest must be an object"]
            else:
                errors = schema_errors(manifest)
        results.append(
            {
                "path": path.relative_to(repo_root).as_posix()
                if path.is_relative_to(repo_root)
                else str(path),
                "valid": not errors,
                "errors": errors,
                "legacy_role_findings": legacy_role_findings(manifest)
                if isinstance(manifest, dict)
                else [],
            }
        )

    invalid = [item for item in results if not item["valid"]]
    payload = {
        "total": len(results),
        "valid": len(results) - len(invalid),
        "invalid": len(invalid),
        "strict": args.strict,
        "results": results,
    }
    if selection_error:
        payload["error"] = selection_error
    legacy_findings = [
        finding
        for item in results
        for finding in item["legacy_role_findings"]
    ]
    payload["legacy_role_summary"] = {
        "total": len(legacy_findings),
        "by_classification": {
            classification: sum(
                1 for finding in legacy_findings if finding["classification"] == classification
            )
            for classification in sorted(
                {finding["classification"] for finding in legacy_findings}
            )
        },
    }
    if args.json:
        print(json.dumps(payload, ensure_ascii=False, indent=2))
    else:
        mode = "strict" if args.strict else "advisory"
        print(f"Manifest schema audit ({mode}): {payload['valid']}/{payload['total']} valid")
        if selection_error:
            print(f"Audit error: {selection_error}")
        for item in invalid:
            print(f"- {item['path']}: {len(item['errors'])} schema error(s)")
            for error in item["errors"][:5]:
                print(f"  - {error}")
            if len(item["errors"]) > 5:
                print(f"  - ... {len(item['errors']) - 5} more")
        for item in results:
            for finding in item["legacy_role_findings"]:
                detail = finding["classification"]
                if "suggested_role" in finding:
                    detail += f" -> {finding['suggested_role']}"
                print(
                    f"- {item['path']}: legacy role advisory "
                    f"{finding['path']} ({finding['role']}): {detail}"
                )
    if selection_error:
        return 2
    return 1 if args.strict and invalid else 0


if __name__ == "__main__":
    raise SystemExit(main())
