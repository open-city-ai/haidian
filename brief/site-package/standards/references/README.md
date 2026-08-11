# Local Standard Reference Snapshots

This directory stores local Markdown snapshots of official or cleared reference materials used by the formal urban design submission rules.

The canonical index is `index.json`. Each record links a `standard_id` to:

- `source_url`: official online source, when available.
- `final_url`: final fetched URL or official PDF URL, when available.
- `local_reference_path`: local repository path to the Markdown snapshot.
- `local_markdown_path`: explicit Markdown snapshot path for AI agents.
- `local_reference_sha256`: SHA-256 of the local Markdown file.
- `fetch_status`: whether the content was fetched, manually extracted from an official PDF, summarized from a user-provided cleared file, or still needs an official file.

AI agents must read these local Markdown files when preparing `standard_matrix.json`. `source_url` alone is not enough evidence for a formal submission.

Do not replace missing official standards with third-party mirrors. If a source is marked `missing_source_url` or `needs_official_file`, treat it as a documented data gap until an official or cleared file is added.

For user-provided cleared task materials, the repository stores a structured Markdown/JSON excerpt rather than the original source file unless the user explicitly approves archiving the full original.
