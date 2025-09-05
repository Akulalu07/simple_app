# Simple App

A full-stack application with a Go Fiber backend and React + TypeScript frontend, using Bun as the package manager and Tailwind CSS for styling.

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Bun (for local development)

### Running with Docker Compose

```bash
# Start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost
# Backend API: http://localhost/api
```

### Local Development

#### Backend (Go)
```bash
cd backend
go run main.go
```

#### Frontend (React + TypeScript + Bun)
```bash
cd frontend
bun install
bun run dev
```

## 📁 Project Structure

```
simple_app/
├── backend/           # Go Fiber API
│   ├── main.go       # Main application file
│   ├── go.mod        # Go dependencies
│   └── Dockerfile    # Backend container config
├── frontend/         # React + TypeScript frontend
│   ├── src/          # Source code
│   ├── public/       # Static assets
│   ├── package.json  # Bun dependencies
│   └── Dockerfile    # Frontend container config
├── docker-compose.yml # Multi-container setup
└── API.md           # API documentation
```

## 🛠 Tech Stack

### Backend
- **Go Fiber** - Fast HTTP framework
- **Docker** - Containerization

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Bun** - Fast package manager and runtime
- **Tailwind CSS** - Utility-first CSS
- **Vite** - Build tool and dev server

### Infrastructure
- **Traefik** - Reverse proxy and load balancer
- **Docker Compose** - Multi-container orchestration

## 📚 API Documentation

See [API.md](./API.md) for detailed API documentation and examples.

## 🔧 Available Scripts

### Frontend
```bash
bun run dev      # Start development server
bun run build    # Build for production
bun run preview  # Preview production build
```

### Backend
```bash
go run main.go   # Start development server
```

## 🌐 Endpoints

- `GET /api/health` - Health check
- `GET /api/hello` - Greeting message
- `GET /` - Root endpoint (same as /api/hello)

## 🎨 Features

- **Modern UI** - Beautiful gradient design with glassmorphism
- **Type Safety** - Full TypeScript support
- **Fast Development** - Bun for lightning-fast package management
- **Responsive Design** - Mobile-first with Tailwind CSS
- **Containerized** - Easy deployment with Docker
- **CORS Enabled** - Ready for cross-origin requests

## 📖 Learn More

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Bun Documentation](https://bun.sh/docs)
- [Go Fiber](https://docs.gofiber.io)
- [Docker Compose](https://docs.docker.com/compose/)