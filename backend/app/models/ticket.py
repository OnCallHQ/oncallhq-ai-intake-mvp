from pydantic import BaseModel


class Ticket(BaseModel):
    id: str
    contact_name: str
    contact_phone: str
    issue: str
    urgency: str
    location: str
    status: str
