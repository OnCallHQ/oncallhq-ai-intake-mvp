from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from threading import Lock
from uuid import uuid4

from app.schemas.ticket import ManualIntakeCreate, TicketResponse, TicketStatusUpdate

DATA_DIR = Path(__file__).resolve().parent.parent / "data"
DATA_FILE = DATA_DIR / "tickets.json"
STORE_LOCK = Lock()

EMERGENCY_KEYWORDS = (
    "burst pipe",
    "flood",
    "flooding",
    "sewage",
    "gas leak",
    "no water",
    "overflowing",
)
HIGH_PRIORITY_KEYWORDS = (
    "leak",
    "leaking",
    "water heater",
    "clog",
    "backed up",
    "backup",
    "overflow",
    "shut off",
)
MEDIUM_PRIORITY_KEYWORDS = (
    "drip",
    "slow drain",
    "toilet",
    "faucet",
    "disposal",
)


class TicketNotFoundError(Exception):
    pass


def list_tickets(status: str | None = None, urgency: str | None = None) -> list[TicketResponse]:
    records = _load_records()

    if status:
        records = [record for record in records if record["status"] == status]
    if urgency:
        records = [record for record in records if record["urgency"] == urgency]

    return [TicketResponse.model_validate(record) for record in records]


def get_ticket(ticket_id: str) -> TicketResponse:
    for record in _load_records():
        if record["id"] == ticket_id:
            return TicketResponse.model_validate(record)
    raise TicketNotFoundError(ticket_id)


def create_ticket(payload: ManualIntakeCreate) -> TicketResponse:
    now = _timestamp()
    urgency = _classify_urgency(payload.issue_summary, payload.transcript)
    emergency = urgency == "emergency"
    summary = _build_summary(payload, urgency)

    ticket = TicketResponse(
        id=str(uuid4()),
        caller_name=payload.caller_name.strip(),
        callback_phone=payload.callback_phone.strip(),
        service_address=payload.service_address.strip(),
        issue_summary=payload.issue_summary.strip(),
        transcript=(payload.transcript or "").strip() or None,
        summary=summary,
        urgency=urgency,
        emergency=emergency,
        status="new",
        source=payload.source,
        created_at=now,
        updated_at=now,
    )

    records = _load_records()
    records.insert(0, ticket.model_dump())
    _save_records(records)
    return ticket


def update_ticket_status(ticket_id: str, payload: TicketStatusUpdate) -> TicketResponse:
    records = _load_records()

    for index, record in enumerate(records):
        if record["id"] != ticket_id:
            continue

        record["status"] = payload.status
        record["updated_at"] = _timestamp()
        records[index] = record
        _save_records(records)
        return TicketResponse.model_validate(record)

    raise TicketNotFoundError(ticket_id)


def _load_records() -> list[dict]:
    with STORE_LOCK:
        DATA_DIR.mkdir(parents=True, exist_ok=True)
        if not DATA_FILE.exists():
            DATA_FILE.write_text("[]", encoding="utf-8")
        raw = DATA_FILE.read_text(encoding="utf-8")
        records = json.loads(raw)
        records.sort(key=lambda record: record["created_at"], reverse=True)
        return records


def _save_records(records: list[dict]) -> None:
    with STORE_LOCK:
        DATA_DIR.mkdir(parents=True, exist_ok=True)
        DATA_FILE.write_text(json.dumps(records, indent=2), encoding="utf-8")


def _build_summary(payload: ManualIntakeCreate, urgency: str) -> str:
    urgency_label = urgency.replace("_", " ").upper()
    return (
        f"{urgency_label}: {payload.caller_name.strip()} reported "
        f"{payload.issue_summary.strip()} at {payload.service_address.strip()}. "
        f"Callback: {payload.callback_phone.strip()}."
    )


def _classify_urgency(issue_summary: str, transcript: str | None) -> str:
    haystack = f"{issue_summary} {transcript or ''}".lower()

    if any(keyword in haystack for keyword in EMERGENCY_KEYWORDS):
        return "emergency"
    if any(keyword in haystack for keyword in HIGH_PRIORITY_KEYWORDS):
        return "high"
    if any(keyword in haystack for keyword in MEDIUM_PRIORITY_KEYWORDS):
        return "medium"
    return "low"


def _timestamp() -> str:
    return datetime.now(timezone.utc).isoformat()
