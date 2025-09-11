package service

import (
	"backend/internal/models"
	"backend/internal/repository"
	"errors"
	"time"
)

// MessageService defines the interface for message business logic
type MessageService interface {
	CreateMessage(req *models.CreateMessageRequest) (*models.MessageResponse, error)
	GetAllMessages(limit int) ([]models.MessageResponse, error)
	GetMessageByID(id uint) (*models.MessageResponse, error)
	UpdateMessage(id uint, content string) (*models.MessageResponse, error)
	DeleteMessage(id uint) error
}

// messageService implements MessageService interface
type messageService struct {
	messageRepo repository.MessageRepository
}

// NewMessageService creates a new message service
func NewMessageService(messageRepo repository.MessageRepository) MessageService {
	return &messageService{
		messageRepo: messageRepo,
	}
}

// CreateMessage creates a new message
func (s *messageService) CreateMessage(req *models.CreateMessageRequest) (*models.MessageResponse, error) {
	// Validate input
	if err := s.validateMessageContent(req.Content); err != nil {
		return nil, err
	}

	// Create message model
	message := &models.Message{
		Content:   req.Content,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	// Save to database
	if err := s.messageRepo.Create(message); err != nil {
		return nil, err
	}

	// Return response
	response := message.ToResponse()
	return &response, nil
}

// GetAllMessages retrieves all messages
func (s *messageService) GetAllMessages(limit int) ([]models.MessageResponse, error) {
	// Set default limit if not provided
	if limit <= 0 {
		limit = 100
	}

	// Get messages from repository
	messages, err := s.messageRepo.GetAll(limit)
	if err != nil {
		return nil, err
	}

	// Convert to response format
	responses := make([]models.MessageResponse, len(messages))
	for i, message := range messages {
		responses[i] = message.ToResponse()
	}

	return responses, nil
}

// GetMessageByID retrieves a message by ID
func (s *messageService) GetMessageByID(id uint) (*models.MessageResponse, error) {
	message, err := s.messageRepo.GetByID(id)
	if err != nil {
		return nil, err
	}

	response := message.ToResponse()
	return &response, nil
}

// UpdateMessage updates an existing message
func (s *messageService) UpdateMessage(id uint, content string) (*models.MessageResponse, error) {
	// Validate input
	if err := s.validateMessageContent(content); err != nil {
		return nil, err
	}

	// Get existing message
	message, err := s.messageRepo.GetByID(id)
	if err != nil {
		return nil, err
	}

	// Update content
	message.Content = content
	message.UpdatedAt = time.Now()

	// Save changes
	if err := s.messageRepo.Update(message); err != nil {
		return nil, err
	}

	// Return response
	response := message.ToResponse()
	return &response, nil
}

// DeleteMessage deletes a message
func (s *messageService) DeleteMessage(id uint) error {
	return s.messageRepo.Delete(id)
}

// validateMessageContent validates message content
func (s *messageService) validateMessageContent(content string) error {
	if len(content) == 0 {
		return errors.New("message content cannot be empty")
	}
	if len(content) > 280 {
		return errors.New("message content cannot exceed 280 characters")
	}
	return nil
}
