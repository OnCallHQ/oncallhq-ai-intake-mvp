# API Overview

## Base URLs

- Frontend local: `http://localhost:3000`
- Backend local: `http://localhost:8000`

## Routes

### `GET /health`

Simple readiness endpoint.

Response:

```json
{
  "status": "ok"
}
```

### `GET /tickets`

Returns the current list of intake tickets.

Current MVP behavior:

- returns an empty list
- no database connection yet

### `POST /tickets`

Creates a placeholder intake ticket response from a request payload.

Example request:

```json
{
  "contact_name": "Jamie Turner",
  "contact_phone": "+16155551212",
  "issue": "Water heater leaking",
  "urgency": "high",
  "location": "Nashville, TN"
}
```

### `POST /webhook`

Stub endpoint for missed-call or telephony provider events.

Current MVP behavior:

- accepts the request
- returns an acknowledgement
- does not process business logic yet
