# Simple App

A modern full-stack web application built with **Svelte**, **Go Fiber**, **PostgreSQL**, and **Docker**. Features a beautiful dark theme UI with real-time messaging, metrics monitoring, and responsive design.

## 🚀 Features

### Frontend (Svelte + TailwindCSS)
- **Modern Dark Theme**: Beautiful gradient backgrounds with glassmorphism effects
- **Accent Color Picker**: Switch between 5 different color themes (Indigo, Cyan, Rose, Violet, Emerald)
- **Responsive Design**: Mobile-friendly layout that works on all screen sizes
- **Real-time Messaging**: Create and view messages with live updates
- **Smooth Animations**: Subtle transitions and hover effects
- **Character Counter**: 280-character limit with visual feedback
- **Loading States**: Elegant loading indicators and error handling

### Backend (Go Fiber + GORM)
- **RESTful API**: Clean endpoints for messages and health checks
- **PostgreSQL Integration**: Persistent data storage with GORM ORM
- **Prometheus Metrics**: Built-in metrics collection for monitoring
- **Auto-migration**: Database schema automatically created
- **Connection Retry**: Robust database connection handling
- **JSON API**: Structured responses with proper error handling

### Infrastructure
- **Docker Compose**: One-command deployment
- **Traefik Reverse Proxy**: Automatic routing and load balancing
- **Prometheus Monitoring**: Metrics collection and storage
- **Grafana Dashboards**: Beautiful visualization of application metrics
- **PostgreSQL Database**: Persistent data storage with volume mounting

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Svelte)      │◄──►│   (Go Fiber)    │◄──►│   (PostgreSQL)  │
│   Port: 3000    │    │   Port: 8080    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Traefik       │
                    │   Port: 80      │
                    └─────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Prometheus    │
                    │   Port: 9091    │
                    └─────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Grafana       │
                    │   Port: 3001    │
                    └─────────────────┘
```

## 🛠️ Tech Stack

### Frontend
- **Svelte 4** - Reactive UI framework
- **TailwindCSS 4** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Bun** - Fast JavaScript runtime and package manager

### Backend
- **Go 1.25** - High-performance programming language
- **Fiber v3** - Express-inspired web framework
- **GORM** - Object-relational mapping library
- **Prometheus Client** - Metrics collection

### Database
- **PostgreSQL 16** - Robust relational database

### Infrastructure
- **Docker & Docker Compose** - Containerization
- **Traefik** - Reverse proxy and load balancer
- **Prometheus** - Metrics collection and monitoring
- **Grafana** - Metrics visualization and dashboards

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd simple_app
```

### 2. Start the Application
```bash
docker compose up -d --build
```

### 3. Access the Application
- **Frontend**: http://localhost/
- **Backend API**: http://localhost/api/
- **Prometheus**: http://localhost:9091/
- **Grafana**: http://localhost:3001/ (admin/admin)

## 📡 API Endpoints

### Health Check
```bash
GET /api/hello
```
Returns a JSON response with a welcome message.

### Messages
```bash
# Get all messages
GET /api/messages

# Create a new message
POST /api/messages
Content-Type: application/json
{
  "content": "Your message here"
}
```

### Metrics
```bash
# Prometheus metrics endpoint
GET /metrics
```

## 🎨 UI Features

### Accent Colors
Switch between 5 beautiful color themes:
- **Indigo** → Fuchsia
- **Cyan** → Blue  
- **Rose** → Pink
- **Violet** → Fuchsia
- **Emerald** → Teal

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly interface
- Optimized for all screen sizes

### Animations
- Fade-in effects for new content
- Smooth hover transitions
- Loading spinners
- Gradient animations
- Glassmorphism effects

## 📊 Monitoring

### Prometheus Metrics
- `app_messages_created_total` - Counter of messages created
- HTTP request metrics
- Database connection metrics

### Grafana Dashboards
Access Grafana at http://localhost:3001 with:
- Username: `admin`
- Password: `admin`

Pre-configured Prometheus datasource for immediate monitoring.

## 🔧 Development

### Local Development Setup

#### Frontend
```bash
cd frontend
bun install
bun run dev
```

#### Backend
```bash
cd backend
go mod tidy
go run main.go
```

### Environment Variables

#### Backend
- `POSTGRES_HOST` - Database host (default: postgres)
- `POSTGRES_PORT` - Database port (default: 5432)
- `POSTGRES_USER` - Database user (default: app)
- `POSTGRES_PASSWORD` - Database password (default: app)
- `POSTGRES_DB` - Database name (default: app)
- `METRICS_ADDR` - Metrics server address (default: :9090)

#### Database
- `POSTGRES_USER` - Database user (default: app)
- `POSTGRES_PASSWORD` - Database password (default: app)
- `POSTGRES_DB` - Database name (default: app)

## 🐳 Docker Services

### Services Overview
- **traefik**: Reverse proxy and load balancer
- **backend**: Go Fiber API server
- **frontend**: Svelte application
- **postgres**: PostgreSQL database
- **prometheus**: Metrics collection
- **grafana**: Metrics visualization

### Volumes
- `pgdata`: PostgreSQL data persistence

### Networks
- `traefik-net`: Internal communication network

## 🚨 Troubleshooting

### Common Issues

#### Docker Build Failures
```bash
# Clean Docker cache
docker system prune -f

# Rebuild without cache
docker compose build --no-cache
```

#### Database Connection Issues
```bash
# Check database logs
docker compose logs postgres

# Restart database
docker compose restart postgres
```

#### Frontend Build Issues
```bash
# Clear node modules and reinstall
cd frontend
rm -rf node_modules bun.lockb
bun install
```

### Logs
```bash
# View all logs
docker compose logs

# View specific service logs
docker compose logs backend
docker compose logs frontend
docker compose logs postgres
```

## 📁 Project Structure

```
simple_app/
├── backend/
│   ├── main.go              # Go Fiber API server
│   ├── go.mod               # Go dependencies
│   ├── go.sum               # Go dependency checksums
│   └── Dockerfile           # Backend container config
├── frontend/
│   ├── src/
│   │   ├── App.svelte       # Main Svelte component
│   │   ├── main.tsx         # Application entry point
│   │   └── index.css        # Global styles and animations
│   ├── package.json         # Frontend dependencies
│   ├── vite.config.ts       # Vite configuration
│   ├── tailwind.config.js   # TailwindCSS configuration
│   └── Dockerfile           # Frontend container config
├── prometheus.yml/          # Prometheus configuration
├── grafana-datasource.yml/  # Grafana datasource config
├── docker-compose.yml       # Multi-service orchestration
└── README.md               # This file
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Svelte](https://svelte.dev/) - The magical disappearing UI framework
- [Go Fiber](https://docs.gofiber.io/) - Express-inspired web framework
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [PostgreSQL](https://www.postgresql.org/) - The world's most advanced open source database
- [Docker](https://www.docker.com/) - Containerization platform
- [Prometheus](https://prometheus.io/) - Monitoring system
- [Grafana](https://grafana.com/) - Observability platform

---

**Built with ❤️ using modern web technologies**