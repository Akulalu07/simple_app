package handlers

import (
	"github.com/gofiber/fiber/v3"
)

// HealthHandler handles health check endpoints
type HealthHandler struct{}

// NewHealthHandler creates a new health handler
func NewHealthHandler() *HealthHandler {
	return &HealthHandler{}
}

// Hello handles GET /api/hello
func (h *HealthHandler) Hello(c fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"message": "Hello!",
	})
}

// Health handles GET /api/health
func (h *HealthHandler) Health(c fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"status": "healthy",
		"service": "simple-app-backend",
	})
}
