#!/usr/bin/env python3
"""Shared policy helpers for submission readiness decisions."""

from __future__ import annotations

from collections.abc import Iterable


_GEOMETRY_TERMS = (
    "geometry",
    "polygon",
    "boundary",
    "boundaries",
    "redline",
    "key area",
    "key-area",
    "几何",
    "边界",
    "红线",
    "重点区域",
    "重点区",
)
_ORGANIZER_TERMS = ("official", "organizer", "官方", "组织方")
_MISSING_TERMS = (
    "missing",
    "required",
    "unavailable",
    "not provided",
    "awaiting",
    "缺少",
    "缺失",
    "未提供",
    "尚未",
    "待提供",
    "待补",
)


def is_organizer_geometry_data_gap(value: object) -> bool:
    """Return whether a disclosed blocker is only missing organizer geometry.

    The repository explicitly allows content scoring with provisional geometry.
    This narrow classifier keeps participant-controlled blockers enforceable
    while preventing official polygon availability from becoming a score gate.
    """

    text = str(value).strip().casefold()
    if not text:
        return False
    return (
        any(term in text for term in _GEOMETRY_TERMS)
        and any(term in text for term in _ORGANIZER_TERMS)
        and any(term in text for term in _MISSING_TERMS)
    )


def partition_known_blockers(values: object) -> tuple[list[str], list[str]]:
    """Split known blockers into participant-controlled and organizer gaps."""

    if not isinstance(values, Iterable) or isinstance(values, (str, bytes, dict)):
        return [], []
    blocking: list[str] = []
    organizer_gaps: list[str] = []
    for value in values:
        text = str(value).strip()
        if not text:
            continue
        target = organizer_gaps if is_organizer_geometry_data_gap(text) else blocking
        target.append(text)
    return blocking, organizer_gaps
