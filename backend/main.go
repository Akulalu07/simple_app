package main

import (
	"backend/internal/config"
	"backend/internal/database"
	"backend/internal/handlers"
	"backend/internal/metrics"
	"backend/internal/middleware"
	"backend/internal/repository"
	"backend/internal/service"
	"log"

	"github.com/gofiber/fiber/v3"
)

func main() {
	// Load configuration
	cfg := config.Load()

	// Initialize database
	db, err := database.NewDatabase(cfg)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	// Initialize metrics
	appMetrics := metrics.NewMetrics()

	// Start metrics server
	go metrics.StartMetricsServer(cfg.Metrics.Port)

	// Initialize repository
	messageRepo := repository.NewMessageRepository(db.DB)

	// Initialize service
	messageService := service.NewMessageService(messageRepo)

	// Initialize handlers
	messageHandler := handlers.NewMessageHandler(messageService, appMetrics.MessagesCreatedCounter)
	healthHandler := handlers.NewHealthHandler()

	// Create Fiber app
	app := fiber.New(fiber.Config{
		ErrorHandler: func(c fiber.Ctx, err error) error {
			code := fiber.StatusInternalServerError
			if e, ok := err.(*fiber.Error); ok {
				code = e.Code
			}
			return c.Status(code).JSON(fiber.Map{
				"error": err.Error(),
			})
		},
	})

	// Middleware
	app.Use(middleware.CORSMiddleware())
	app.Use(middleware.LoggingMiddleware())

	// Health endpoints
	app.Get("/api/hello", healthHandler.Hello)
	app.Get("/api/health", healthHandler.Health)

	// Message endpoints
	api := app.Group("/api")
	api.Get("/messages", messageHandler.GetAllMessages)
	api.Post("/messages", messageHandler.CreateMessage)
	api.Get("/messages/:id", messageHandler.GetMessageByID)
	api.Put("/messages/:id", messageHandler.UpdateMessage)
	api.Delete("/messages/:id", messageHandler.DeleteMessage)

	// Start server
	log.Printf("Server starting on port %s", cfg.Server.Port)
	log.Fatal(app.Listen("0.0.0.0:" + cfg.Server.Port))
}
