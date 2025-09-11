package config

import (
	"os"
)

// Config holds all configuration for our application
type Config struct {
	Database DatabaseConfig
	Server   ServerConfig
	Metrics  MetricsConfig
}

// DatabaseConfig holds database configuration
type DatabaseConfig struct {
	Host     string
	Port     string
	User     string
	Password string
	DBName   string
}

// ServerConfig holds server configuration
type ServerConfig struct {
	Port string
}

// MetricsConfig holds metrics configuration
type MetricsConfig struct {
	Port string
}

// Load loads configuration from environment variables
func Load() *Config {
	return &Config{
		Database: DatabaseConfig{
			Host:     getEnv("POSTGRES_HOST", "postgres"),
			Port:     getEnv("POSTGRES_PORT", "5432"),
			User:     getEnv("POSTGRES_USER", "app"),
			Password: getEnv("POSTGRES_PASSWORD", "app"),
			DBName:   getEnv("POSTGRES_DB", "app"),
		},
		Server: ServerConfig{
			Port: getEnv("SERVER_PORT", "8080"),
		},
		Metrics: MetricsConfig{
			Port: getEnv("METRICS_ADDR", ":9090"),
		},
	}
}

// getEnv gets an environment variable with a fallback value
func getEnv(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}
