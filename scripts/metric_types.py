"""Shared JSON metric type predicates used by the review gates."""

from __future__ import annotations

import math


def is_json_number(value: object) -> bool:
    """Return true only for JSON numbers, never for Python booleans."""

    # Python makes bool a subclass of int, but JSON booleans are not numbers.
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        return False
    if isinstance(value, int):
        try:
            value = float(value)
        except OverflowError:
            return False
    return math.isfinite(value)
