package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
)

func hello(c *fiber.Ctx) error {
	return c.SendString("Hello, World!")
}

func main() {
	app := fiber.New()

	app.Get("/", hello)

	log.Fatal(app.Listen("0.0.0.0:8080"))
}
