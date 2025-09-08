package main

import (
	"log"

	"github.com/gofiber/fiber/v3"
)

func main() {
	app := fiber.New()

	app.Get("/api/hello", func(c fiber.Ctx) error {
		return c.SendString("Hello!")
	})

	app.Get("/api/", func(c fiber.Ctx) error {
		return c.SendString("LOL!")
	})

	log.Fatal(app.Listen("0.0.0.0:8080"))
}
