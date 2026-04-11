from pydantic import BaseModel


class Ticket(BaseModel):
    id: str
    caller_name: str
    callback_phone: str
    service_address: str
    issue_summary: str
    transcript: str | None = None
    summary: str
    urgency: str
    emergency: bool
    status: str
    source: str
    created_at: str
    updated_at: str
