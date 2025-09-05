package main

import (
    "log"

    "github.com/gofiber/fiber/v2"
    "github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
    app := fiber.New()

    // Enable CORS for local development and cross-origin requests
    app.Use(cors.New())

    app.Get("/api/hello", func(c *fiber.Ctx) error {
        return c.JSON(fiber.Map{
            "message": "Hello from Fiber API",
        })
    })

    if err := app.Listen(":8080"); err != nil {
        log.Fatal(err)
    }
}

