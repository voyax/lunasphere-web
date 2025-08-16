# Head Start Web - Deployment Files

This directory contains all deployment-related files for the Head Start Web application.

## 📁 File Overview

### 🐳 Docker Configuration

- **`docker-compose.yml`** - Production deployment configuration

### 🔧 Build Scripts

- **`build.sh`** - Standard Docker image build script (builds from source)
- **`docker-build-local.sh`** - Local Docker build script (uses pre-built files)

### ⚙️ Environment Configuration

- **`.env.production`** - Production environment variables template

## 🚀 Quick Start

### 1. Build Image

```bash
# Standard build (from source)
./build.sh

# Build specific version
./build.sh v1.0.0

# Local build (from pre-built files)
./docker-build-local.sh
```

### 2. Deploy Application

```bash
# Start application
docker-compose up -d

# View logs
docker-compose logs -f
```



## 🔧 Common Commands

```bash
# Check running status
docker-compose ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Restart services
docker-compose restart

# Update images
docker-compose pull && docker-compose up -d
```

## 🆘 Troubleshooting

### Common Issues

1. **Port Conflict (Port 3000 already in use)**
   ```bash
   # Check what's using port 3000
   lsof -i :3000
   
   # Stop conflicting service or modify docker-compose.yml
   ```

2. **Application Not Starting**
   ```bash
   # Check logs for errors
   docker-compose logs
   
   # Restart services
   docker-compose down && docker-compose up -d
   ```

3. **Image Not Found**
   ```bash
   # Build image locally first
   ./build.sh
   ```
