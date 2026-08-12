# Common Port offline replay protocol / 公共接口离线复跑协议

Status: executable synthetic evidence; not field performance, approval, legal advice, accessibility certification, model-quality evaluation, or an authorized pilot.

## One-command check / 一条命令复核

From the submission directory:

```sh
node visual/assets/replay-protocols.js --check
```

The command uses only the Node.js standard library and makes no network requests. It loads `simulation.json`, validates explicit inputs, recursively sorts JSON object keys, encodes compact UTF-8 JSON, recomputes SHA-256 hashes, derives the policy result independently, evaluates one counterfactual per task, checks the energy envelope and audit/data flags, and compares the result with `visual/assets/replay-evidence.json`. Any mismatch exits non-zero.

To inspect one flagship or all structured results:

```sh
node visual/assets/replay-protocols.js --check --pilot SC-01 --json
node visual/assets/replay-protocols.js --check --json
```

The three pilot IDs are `SC-01`, `SC-05`, and `SC-09`. Each has five primary fixtures and five paired counterfactual assertions: minimum data, non-AI parity, red-card hold, human final decision, and expiry/audit. The persisted package therefore contains 15 tasks and 30 independently derived policy assertions.

## Canonical hash contract / 规范哈希约定

`recursive_key_sort_utf8_compact_json_v1` means:

1. Recursively sort object keys lexicographically.
2. Preserve array order.
3. Serialize valid JSON without insignificant whitespace.
4. Encode the result as UTF-8.
5. Compute SHA-256 over those exact bytes.

The persisted evidence records hashes of the runner, schema, and simulation file, so any reviewed change invalidates the evidence and requires regeneration:

```sh
node visual/assets/replay-protocols.js --write-evidence
node visual/assets/replay-protocols.js --check
```

## Failure boundary / 失败边界

The runner fails closed when an input shape is wrong, a fixture hash drifts, a derived primary or counterfactual control differs, energy exceeds its declared synthetic envelope, the audit is incomplete, or a task claims personal data. Passing proves only that the declared policy logic is reproducible for these explicit synthetic inputs. It does not establish that a model is safe, useful, inclusive, legally compliant, or feasible on site.

Field evidence remains pre-registered future work. `visual/assets/port-protocols.json#field_validation_plan` requires an authorized venue and sponsor, affected-group stewardship, staffed non-AI service, consent, accessibility, safeguarding, insurance and emergency provisions before any session. No field metric may be labelled passed until independently reviewed observations exist.
