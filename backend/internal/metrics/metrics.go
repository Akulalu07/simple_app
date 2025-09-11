package metrics

import (
	"log"
	"net/http"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

// Metrics holds all application metrics
type Metrics struct {
	MessagesCreatedCounter prometheus.Counter
	HTTPRequestsTotal      prometheus.Counter
	HTTPRequestDuration    prometheus.Histogram
}

// NewMetrics creates and registers all metrics
func NewMetrics() *Metrics {
	messagesCreatedCounter := prometheus.NewCounter(prometheus.CounterOpts{
		Name: "app_messages_created_total",
		Help: "Total number of messages created",
	})

	httpRequestsTotal := prometheus.NewCounter(prometheus.CounterOpts{
		Name: "app_http_requests_total",
		Help: "Total number of HTTP requests",
	})

	httpRequestDuration := prometheus.NewHistogram(prometheus.HistogramOpts{
		Name:    "app_http_request_duration_seconds",
		Help:    "HTTP request duration in seconds",
		Buckets: prometheus.DefBuckets,
	})

	// Register metrics
	prometheus.MustRegister(messagesCreatedCounter)
	prometheus.MustRegister(httpRequestsTotal)
	prometheus.MustRegister(httpRequestDuration)

	return &Metrics{
		MessagesCreatedCounter: messagesCreatedCounter,
		HTTPRequestsTotal:      httpRequestsTotal,
		HTTPRequestDuration:    httpRequestDuration,
	}
}

// StartMetricsServer starts the Prometheus metrics server
func StartMetricsServer(addr string) {
	mux := http.NewServeMux()
	mux.Handle("/metrics", promhttp.Handler())

	log.Printf("metrics server listening on %s", addr)
	if err := http.ListenAndServe(addr, mux); err != nil {
		log.Printf("metrics server error: %v", err)
	}
}
