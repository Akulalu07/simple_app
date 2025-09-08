FROM golang:1.25-alpine AS builder

WORKDIR /app

RUN apk add --no-cache git

COPY . .

RUN [ -f go.mod ] || go mod init backend
RUN go get 

RUN CGO_ENABLED=0 GOOS=linux go build -o server .

FROM alpine:3.20
WORKDIR /app
COPY --from=builder /app/server /app/server
EXPOSE 8080
ENTRYPOINT ["/app/server"]

