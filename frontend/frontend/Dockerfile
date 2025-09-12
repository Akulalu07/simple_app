# Use the official Bun image
FROM oven/bun:1.2.21-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Expose port
EXPOSE 3000

# Install a simple HTTP server
RUN bun add -g serve

# Start the application
CMD ["serve", "-s", "dist", "-l", "3000"]
