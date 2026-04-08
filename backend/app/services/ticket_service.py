from app.schemas.ticket import TicketCreate, TicketResponse


def build_ticket_response(payload: TicketCreate) -> TicketResponse:
    return TicketResponse(
        id="pending",
        contact_name=payload.contact_name,
        contact_phone=payload.contact_phone,
        issue=payload.issue,
        urgency=payload.urgency,
        location=payload.location,
        status="new",
    )
