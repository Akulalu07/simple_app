package models

import (
	"time"

	"gorm.io/gorm"
)

// Message represents a message in the system
type Message struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	Content   string         `json:"content" gorm:"not null"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`
}

// CreateMessageRequest represents the request payload for creating a message
type CreateMessageRequest struct {
	Content string `json:"content" validate:"required,min=1,max=280"`
}

// MessageResponse represents the response payload for a message
type MessageResponse struct {
	ID        uint      `json:"id"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"createdAt"`
}

// ToResponse converts a Message model to MessageResponse
func (m *Message) ToResponse() MessageResponse {
	return MessageResponse{
		ID:        m.ID,
		Content:   m.Content,
		CreatedAt: m.CreatedAt,
	}
}
