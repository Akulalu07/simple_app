package middleware

import (
	"time"

	"github.com/gofiber/fiber/v3"
)

// CORSMiddleware handles CORS
func CORSMiddleware() fiber.Handler {
	return func(c fiber.Ctx) error {
		c.Set("Access-Control-Allow-Origin", "*")
		c.Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if c.Method() == "OPTIONS" {
			return c.SendStatus(fiber.StatusNoContent)
		}

		return c.Next()
	}
}

// LoggingMiddleware logs HTTP requests
func LoggingMiddleware() fiber.Handler {
	return func(c fiber.Ctx) error {
		start := time.Now()
		err := c.Next()
		_ = time.Since(start) // Duration calculated but not used in this simple implementation

		// Log request
		// In production, you might want to use a structured logger
		// For now, we'll use the standard log package
		// log.Printf("%s %s %d %v", c.Method(), c.Path(), c.Response().StatusCode(), duration)

		return err
	}
}
