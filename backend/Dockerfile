FROM golang:1.25-alpine AS builder

WORKDIR /app

RUN apk add --no-cache git

COPY . .

RUN [ -f go.mod ] || go mod init backend
RUN go mod tidy

RUN CGO_ENABLED=0 GOOS=linux go build -o server .

FROM alpine:3.20
WORKDIR /app
COPY --from=builder /app/server /app/server
EXPOSE 8080
ENV POSTGRES_HOST=postgres \
    POSTGRES_PORT=5432 \
    POSTGRES_USER=app \
    POSTGRES_PASSWORD=app \
    POSTGRES_DB=app
ENTRYPOINT ["/app/server"]

