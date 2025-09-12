# Simple App API

## Overview

Simple REST API built with Go and Fiber. Provides health checks, a greeting, and CRUD for messages. Prometheus metrics are exposed separately.

- Base URL (default): `http://localhost:8080`
- Base path behind a proxy (e.g., Traefik): `http://localhost/api`
- Metrics (default): `http://localhost:9090/metrics`

Configuration is controlled via env vars: `SERVER_PORT` (default `8080`), `METRICS_ADDR` (default `:9090`).

## Conventions

- Content-Type: `application/json`
- Errors: `{"error": string}` with appropriate HTTP status
- Timestamps: ISO-8601 strings in UTC

## Schemas

Message

```json
{
  "id": 1,
  "content": "string",
  "createdAt": "2025-01-01T12:34:56Z"
}
```

CreateMessageRequest

```json
{
  "content": "string (1..280 chars)"
}
```

UpdateMessageRequest

```json
{
  "content": "string"
}
```

## Endpoints

### Health

GET `/api/health`

Response 200

```json
{
  "status": "healthy",
  "service": "simple-app-backend"
}
```

Example

```bash
curl http://localhost:8080/api/health
```

### Hello

GET `/api/hello`

Response 200

```json
{
  "message": "Hello!"
}
```

Example

```bash
curl http://localhost:8080/api/hello
```

### Messages

List messages

GET `/api/messages?limit=100`

- Query params: `limit` optional, integer > 0, default 100
- Response 200: `Message[]`
- Response 500: `{ "error": "Failed to fetch messages" }`

```bash
curl "http://localhost:8080/api/messages?limit=50"
```

Create message

POST `/api/messages`

- Body: `CreateMessageRequest`
- Response 201: `Message` (subset with `id`, `content`, `createdAt`)
- Response 400: `{ "error": string }` (validation or service error)

```bash
curl -X POST http://localhost:8080/api/messages \
  -H 'Content-Type: application/json' \
  -d '{"content":"Hello world"}'
```

Get message by id

GET `/api/messages/:id`

- Path params: `id` uint
- Response 200: `Message`
- Response 400: `{ "error": "Invalid message ID" }`
- Response 404: `{ "error": "Message not found" }`

```bash
curl http://localhost:8080/api/messages/1
```

Update message

PUT `/api/messages/:id`

- Body: `UpdateMessageRequest`
- Response 200: `Message`
- Response 400: `{ "error": string }` (invalid id or validation/service error)

```bash
curl -X PUT http://localhost:8080/api/messages/1 \
  -H 'Content-Type: application/json' \
  -d '{"content":"Updated"}'
```

Delete message

DELETE `/api/messages/:id`

- Response 204: No body
- Response 400: `{ "error": "Invalid message ID" }`
- Response 500: `{ "error": "Failed to delete message" }`

```bash
curl -X DELETE http://localhost:8080/api/messages/1 -i
```

## Metrics

Prometheus metrics are exposed on a separate HTTP server.

- GET `/metrics` on `METRICS_ADDR` (default `:9090`)

```bash
curl http://localhost:9090/metrics | head -20
```

Notable metrics:

- `app_messages_created_total` counter
- `app_http_requests_total` counter
- `app_http_request_duration_seconds` histogram

## Error model

Global error handler returns

```json
{ "error": "message" }
```

with status codes such as 400, 404, or 500 depending on the failure.

## CORS

CORS is enabled; the API is callable from browsers across origins.

## Running locally

```bash
cd backend
go run main.go
```

With Docker Compose

```bash
docker-compose up --build
```

When running behind Traefik via Compose, prefix routes with `/api`.
