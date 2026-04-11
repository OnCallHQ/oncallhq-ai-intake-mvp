from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field

TicketUrgency = Literal["low", "medium", "high", "emergency"]
TicketStatus = Literal["new", "acknowledged", "in_progress", "resolved", "closed"]
TicketSource = Literal["dashboard", "webhook"]


class ManualIntakeCreate(BaseModel):
    caller_name: str = Field(min_length=2, max_length=120)
    callback_phone: str = Field(min_length=7, max_length=32)
    service_address: str = Field(min_length=4, max_length=200)
    issue_summary: str = Field(min_length=4, max_length=500)
    transcript: str | None = Field(default=None, max_length=4000)
    source: TicketSource = "dashboard"


class TicketStatusUpdate(BaseModel):
    status: TicketStatus


class TicketResponse(BaseModel):
    id: str
    caller_name: str
    callback_phone: str
    service_address: str
    issue_summary: str
    transcript: str | None = None
    summary: str
    urgency: TicketUrgency
    emergency: bool
    status: TicketStatus
    source: TicketSource
    created_at: str
    updated_at: str
