from pydantic import BaseModel


class TicketBase(BaseModel):
    contact_name: str
    contact_phone: str
    issue: str
    urgency: str
    location: str


class TicketCreate(TicketBase):
    pass


class TicketResponse(TicketBase):
    id: str
    status: str
