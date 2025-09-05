# Simple App API Documentation

## Overview

This is a simple REST API built with Go Fiber framework. The API provides basic endpoints for health checking and greeting functionality.

**Base URL:** `http://localhost:8080` (development) or `http://localhost/api` (with Traefik)

## Endpoints

### 1. Health Check

Check if the API is running and healthy.

**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "status": "healthy",
  "service": "simple-app-backend"
}
```

**Example Request:**
```bash
curl -X GET http://localhost:8080/api/health
```

**Example Response:**
```json
{
  "status": "healthy",
  "service": "simple-app-backend"
}
```

### 2. Hello Message

Get a greeting message from the API.

**Endpoint:** `GET /api/hello`

**Response:**
```json
{
  "message": "Hello from Fiber API!",
  "status": "success"
}
```

**Example Request:**
```bash
curl -X GET http://localhost:8080/api/hello
```

**Example Response:**
```json
{
  "message": "Hello from Fiber API!",
  "status": "success"
}
```

### 3. Root Endpoint

Same as `/api/hello` but accessible at the root path.

**Endpoint:** `GET /`

**Response:**
```json
{
  "message": "Hello from Fiber API!",
  "status": "success"
}
```

## Making Requests

### Using cURL

```bash
# Health check
curl -X GET http://localhost:8080/api/health

# Get hello message
curl -X GET http://localhost:8080/api/hello

# Root endpoint
curl -X GET http://localhost:8080/
```

### Using JavaScript/Fetch

```javascript
// Health check
const healthResponse = await fetch('http://localhost:8080/api/health');
const healthData = await healthResponse.json();
console.log(healthData);

// Hello message
const helloResponse = await fetch('http://localhost:8080/api/hello');
const helloData = await helloResponse.json();
console.log(helloData);
```

### Using Python (requests)

```python
import requests

# Health check
response = requests.get('http://localhost:8080/api/health')
print(response.json())

# Hello message
response = requests.get('http://localhost:8080/api/hello')
print(response.json())
```

### Using Postman

1. Create a new GET request
2. Set URL to `http://localhost:8080/api/health` or `http://localhost:8080/api/hello`
3. Send the request

## Error Handling

The API uses standard HTTP status codes:

- `200 OK` - Request successful
- `404 Not Found` - Endpoint not found
- `500 Internal Server Error` - Server error

## CORS

The API includes CORS middleware, so it can be called from web browsers from different origins.

## Running the API

### Development Mode

```bash
cd backend
go run main.go
```

### Using Docker

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or run just the backend
docker-compose up backend
```

### Using Docker Compose with Traefik

When running with `docker-compose up`, the API is accessible at:
- `http://localhost/api/health`
- `http://localhost/api/hello`

## Response Format

All successful responses return JSON with the following structure:

```json
{
  "message": "string",  // Optional: Human-readable message
  "status": "string"    // Status indicator (success, healthy, etc.)
}
```

## Frontend Integration

The frontend (React + TypeScript) automatically calls `/api/hello` on load and displays the message. The API response structure matches the TypeScript interface:

```typescript
interface ApiResponse {
  message: string
}
```

## Development Notes

- The API runs on port 8080
- Uses Go Fiber v2 framework
- Includes CORS middleware for cross-origin requests
- All endpoints return JSON responses
- No authentication required (simple demo API)
