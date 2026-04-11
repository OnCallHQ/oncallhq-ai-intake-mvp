from __future__ import annotations

import os


def get_cors_origins() -> list[str]:
    raw_origins = os.getenv("BACKEND_CORS_ORIGINS", "http://localhost:3000")
    return [origin.strip() for origin in raw_origins.split(",") if origin.strip()]
