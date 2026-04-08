from fastapi import FastAPI

from app.routes.health import router as health_router
from app.routes.tickets import router as tickets_router
from app.routes.webhook import router as webhook_router


app = FastAPI(
    title="OnCallHQ API",
    version="0.1.0",
    description="MVP API skeleton for AI call intake and dispatch.",
)

app.include_router(health_router)
app.include_router(tickets_router)
app.include_router(webhook_router)
