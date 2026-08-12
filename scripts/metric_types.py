"""Shared JSON metric type predicates used by the review gates."""

from __future__ import annotations


def is_json_number(value: object) -> bool:
    """Return true only for JSON numbers, never for Python booleans."""

    # Python makes bool a subclass of int, but JSON booleans are not numbers.
    return isinstance(value, (int, float)) and not isinstance(value, bool)
