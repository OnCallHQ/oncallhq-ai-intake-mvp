from fastapi import APIRouter, status

from app.schemas.ticket import TicketCreate, TicketResponse
from app.services.ticket_service import build_ticket_response

router = APIRouter(prefix="/tickets", tags=["tickets"])


@router.get("", response_model=list[TicketResponse])
def list_tickets() -> list[TicketResponse]:
    return []


@router.post("", response_model=TicketResponse, status_code=status.HTTP_201_CREATED)
def create_ticket(payload: TicketCreate) -> TicketResponse:
    return build_ticket_response(payload)
