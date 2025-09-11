package handlers

import (
	"backend/internal/models"
	"backend/internal/service"
	"strconv"

	"github.com/gofiber/fiber/v3"
	"github.com/prometheus/client_golang/prometheus"
)

// MessageHandler handles HTTP requests for messages
type MessageHandler struct {
	messageService service.MessageService
	messagesCreatedCounter prometheus.Counter
}

// NewMessageHandler creates a new message handler
func NewMessageHandler(messageService service.MessageService, messagesCreatedCounter prometheus.Counter) *MessageHandler {
	return &MessageHandler{
		messageService:         messageService,
		messagesCreatedCounter: messagesCreatedCounter,
	}
}

// CreateMessage handles POST /api/messages
func (h *MessageHandler) CreateMessage(c fiber.Ctx) error {
	var req models.CreateMessageRequest
	if err := c.Bind().JSON(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request payload",
		})
	}

	// Create message
	response, err := h.messageService.CreateMessage(&req)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	// Increment metrics counter
	h.messagesCreatedCounter.Inc()

	return c.Status(fiber.StatusCreated).JSON(response)
}

// GetAllMessages handles GET /api/messages
func (h *MessageHandler) GetAllMessages(c fiber.Ctx) error {
	// Parse limit from query parameter
	limitStr := c.Query("limit", "100")
	limit, err := strconv.Atoi(limitStr)
	if err != nil || limit <= 0 {
		limit = 100
	}

	// Get messages
	messages, err := h.messageService.GetAllMessages(limit)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch messages",
		})
	}

	return c.JSON(messages)
}

// GetMessageByID handles GET /api/messages/:id
func (h *MessageHandler) GetMessageByID(c fiber.Ctx) error {
	idStr := c.Params("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid message ID",
		})
	}

	message, err := h.messageService.GetMessageByID(uint(id))
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Message not found",
		})
	}

	return c.JSON(message)
}

// UpdateMessage handles PUT /api/messages/:id
func (h *MessageHandler) UpdateMessage(c fiber.Ctx) error {
	idStr := c.Params("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid message ID",
		})
	}

	var req struct {
		Content string `json:"content"`
	}
	if err := c.Bind().JSON(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request payload",
		})
	}

	message, err := h.messageService.UpdateMessage(uint(id), req.Content)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.JSON(message)
}

// DeleteMessage handles DELETE /api/messages/:id
func (h *MessageHandler) DeleteMessage(c fiber.Ctx) error {
	idStr := c.Params("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid message ID",
		})
	}

	if err := h.messageService.DeleteMessage(uint(id)); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to delete message",
		})
	}

	return c.Status(fiber.StatusNoContent).Send(nil)
}
