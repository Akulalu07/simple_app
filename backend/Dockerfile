FROM golang:1.25-alpine AS builder

WORKDIR /app

# Required for fetching Go modules via git
RUN apk add --no-cache git

# Copy source code
COPY . .

# Initialize module if not present and fetch Fiber
RUN [ -f go.mod ] || go mod init backend
RUN go get 

# Build the application (static, linux binary)
RUN CGO_ENABLED=0 GOOS=linux go build -o server .

FROM alpine:3.20
WORKDIR /app
COPY --from=builder /app/server /app/server
EXPOSE 8080
ENTRYPOINT ["/app/server"]

