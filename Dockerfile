# Multi-stage Dockerfile for Ha Hu Ai production deployment on Google Cloud Run
# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Build Vite frontend and bundled Node server
ENV NODE_ENV=production
RUN npm run build

# Stage 2: Production runner stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Install production dependencies only
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy built artifacts from builder
COPY --from=builder /app/dist ./dist

# Create a non-root user for security compliance
USER node

# Expose container port
EXPOSE 3000

# Start compiled server
CMD ["node", "dist/server.cjs"]
