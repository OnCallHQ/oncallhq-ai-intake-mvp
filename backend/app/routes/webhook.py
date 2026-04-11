from fastapi import APIRouter, status

router = APIRouter(prefix="/webhook", tags=["webhook"])


@router.post("", status_code=status.HTTP_202_ACCEPTED)
def receive_webhook() -> dict[str, str]:
    return {"status": "accepted", "message": "Webhook stub ready for telephony integration."}
