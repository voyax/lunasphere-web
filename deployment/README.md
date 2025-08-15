# Head Start Web - Deployment Files

This directory contains all deployment-related files for the Head Start Web application.

## 📁 File Overview

### 🐳 Docker Configuration

- **`docker-compose.yml`** - Complete production configuration (with environment variables)
- **`docker-compose.simple.yml`** - Simplified configuration (no environment variables)

### 🔧 Build Scripts

- **`build.sh`** - Docker image build script
- **`push.sh`** - Docker image push script

### ⚙️ Environment Configuration

- **`.env.production`** - Production environment variables template

## 🚀 Quick Start

### 1. Build Image

```bash
# Build development version
./build.sh

# Build specific version
./build.sh v1.0.0
```

### 2. Push Image

```bash
# Push to Docker Hub
./push.sh dev-abc1234
```

### 3. Deploy Application

#### Option 1: Simple Deployment (Recommended)

```bash
# Start application only (web service)
docker-compose -f docker-compose.simple.yml up head-start-web

# Full deployment (web + proxy)
docker-compose -f docker-compose.simple.yml up -d
```

#### Option 2: Environment Variable Configuration

```bash
# Copy environment template
cp .env.production .env.local

# Edit configuration
vim .env.local

# Start services
docker-compose up -d
```

## 🌍 Environment Configuration

### Development Environment

```bash
# Start application only
docker-compose --profile dev up -d
```

### Production Environment

```bash
# Start application + reverse proxy
docker-compose --profile prod up -d
```

## 🔧 Common Commands

```bash
# Check running status
docker-compose ps

# View logs
docker-compose logs -f head-start-web

# Stop services
docker-compose down

# Restart services
docker-compose restart head-start-web

# Update images
docker-compose pull
docker-compose up -d
```

## 📊 Resource Configuration

- **Memory Limit**: 1GB
- **CPU Limit**: 1 core
- **Minimum Resources**: 512MB memory, 0.5 core
- **Health Check**: 30-second interval

## 🆘 Troubleshooting

### Common Issues

1. **Image Pull Failed**
   ```bash
   docker login
   docker pull voyax/head-start-web:latest
   ```

2. **Port Conflict**
   ```bash
   # Check port usage
   lsof -i :3000
   
   # Modify port mapping
   # Edit ports configuration in docker-compose.yml
   ```

3. **Health Check Failed**
   ```bash
   # Check application logs
   docker-compose logs head-start-web
   
   # Manual health check test
   docker exec head-start-web-prod node healthcheck.js
   ```
