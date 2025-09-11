package repository

import (
	"backend/internal/models"

	"gorm.io/gorm"
)

// MessageRepository defines the interface for message data operations
type MessageRepository interface {
	Create(message *models.Message) error
	GetAll(limit int) ([]models.Message, error)
	GetByID(id uint) (*models.Message, error)
	Update(message *models.Message) error
	Delete(id uint) error
}

// messageRepository implements MessageRepository interface
type messageRepository struct {
	db *gorm.DB
}

// NewMessageRepository creates a new message repository
func NewMessageRepository(db *gorm.DB) MessageRepository {
	return &messageRepository{
		db: db,
	}
}

// Create creates a new message in the database
func (r *messageRepository) Create(message *models.Message) error {
	return r.db.Create(message).Error
}

// GetAll retrieves all messages from the database with a limit
func (r *messageRepository) GetAll(limit int) ([]models.Message, error) {
	var messages []models.Message
	err := r.db.Order("id DESC").Limit(limit).Find(&messages).Error
	return messages, err
}

// GetByID retrieves a message by its ID
func (r *messageRepository) GetByID(id uint) (*models.Message, error) {
	var message models.Message
	err := r.db.First(&message, id).Error
	if err != nil {
		return nil, err
	}
	return &message, nil
}

// Update updates an existing message
func (r *messageRepository) Update(message *models.Message) error {
	return r.db.Save(message).Error
}

// Delete soft deletes a message by its ID
func (r *messageRepository) Delete(id uint) error {
	return r.db.Delete(&models.Message{}, id).Error
}
