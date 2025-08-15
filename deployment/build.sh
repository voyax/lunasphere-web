#!/bin/bash

# Simple Docker build script
# Usage: ./build.sh [version]

set -e

# Configuration
IMAGE_NAME="voyax/head-start-web"
VERSION="${1:-dev}"
GIT_HASH=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
TAG="${VERSION}-${GIT_HASH}"

echo "🔨 Building Docker image..."
echo "📦 Image: ${IMAGE_NAME}:${TAG}"
echo "📦 Image: ${IMAGE_NAME}:latest"

# Build image
docker build -t "${IMAGE_NAME}:${TAG}" -t "${IMAGE_NAME}:latest" .

echo "✅ Build completed!"
echo "📋 Built images:"
docker images "${IMAGE_NAME}" --format "table {{.Repository}}:{{.Tag}}\t{{.Size}}\t{{.CreatedAt}}"