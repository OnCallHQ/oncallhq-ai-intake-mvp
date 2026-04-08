# Architecture Overview

## Objective

OnCallHQ v1 is a narrow MVP for missed-call intake in home services.

The system shape is intentionally simple:

- `frontend/` provides an internal dashboard shell
- `backend/` exposes API routes for health, tickets, and inbound webhooks
- PostgreSQL stores tickets and intake metadata later

## High-Level Flow

1. A missed call event or provider webhook reaches the backend.
2. The backend accepts the payload and normalizes intake data.
3. Ticket records are created and stored.
4. The frontend displays ticket state for the contractor or dispatcher.

## Design Principles

- Keep the monorepo obvious for new engineers
- Delay abstractions until real workflow complexity appears
- Separate API schemas, models, and services without building a heavy framework
- Keep the frontend focused on operator visibility, not product breadth

## Near-Term Additions

- Database connection and migrations
- Webhook payload validation
- Ticket persistence
- LLM extraction and downstream notification integration
