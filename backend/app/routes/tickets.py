from fastapi import APIRouter, HTTPException, Query, status

from app.schemas.ticket import (
    ManualIntakeCreate,
    TicketResponse,
    TicketStatus,
    TicketStatusUpdate,
    TicketUrgency,
)
from app.services.ticket_service import (
    TicketNotFoundError,
    create_ticket,
    get_ticket,
    list_tickets,
    update_ticket_status,
)

router = APIRouter(prefix="/tickets", tags=["tickets"])


@router.get("", response_model=list[TicketResponse])
def list_tickets_route(
    status: TicketStatus | None = Query(default=None),
    urgency: TicketUrgency | None = Query(default=None),
) -> list[TicketResponse]:
    return list_tickets(status=status, urgency=urgency)


@router.post("", response_model=TicketResponse, status_code=status.HTTP_201_CREATED)
def create_ticket_route(payload: ManualIntakeCreate) -> TicketResponse:
    return create_ticket(payload)


@router.get("/{ticket_id}", response_model=TicketResponse)
def get_ticket_route(ticket_id: str) -> TicketResponse:
    try:
        return get_ticket(ticket_id)
    except TicketNotFoundError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Ticket not found") from exc


@router.patch("/{ticket_id}", response_model=TicketResponse)
def update_ticket_route(ticket_id: str, payload: TicketStatusUpdate) -> TicketResponse:
    try:
        return update_ticket_status(ticket_id, payload)
    except TicketNotFoundError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Ticket not found") from exc
