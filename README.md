# OnCallHQ MVP

OnCallHQ is an AI call intake and dispatch assistant for home service businesses.

This repository is the v1 MVP monorepo. It is intentionally small and focused on the core intake loop:

- capture missed-call requests
- extract issue, urgency, location, and contact details
- send a clean summary
- create a ticket

## Monorepo Structure

- `frontend/` - Next.js dashboard shell
- `backend/` - FastAPI API skeleton
- `docs/` - architecture and API notes

## Stack

- Frontend: Next.js, TypeScript, Tailwind CSS
- Backend: FastAPI, Python
- Database: PostgreSQL
- Local orchestration: Docker Compose

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Infrastructure

```bash
docker-compose up -d db
```

## MVP Boundaries

- No business logic yet
- No background jobs
- No third-party integrations yet
- No auth yet

This scaffold is meant to give the team a clean starting point for the next implementation pass.
