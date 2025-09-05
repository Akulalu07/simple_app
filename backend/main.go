package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type HelloResponse struct {
	Message string `json:"message"`
	Status  string `json:"status"`
}

func hello(c *fiber.Ctx) error {
	return c.JSON(HelloResponse{
		Message: "Hello world",
		Status:  "success",
	})
}

func health(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"status": "healthy",
		"service": "simple-app-backend",
	})
}

func main() {
	app := fiber.New()

	// Middleware
	app.Use(cors.New())

	// Routes
	app.Get("/", hello)
	app.Get("/api/hello", hello)
	app.Get("/api/health", health)

	log.Fatal(app.Listen("0.0.0.0:8080"))
}
