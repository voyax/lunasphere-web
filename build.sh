#!/bin/bash

# Simple Docker build script
# Usage: ./build.sh [version]

set -e

# Configuration
IMAGE_NAME="voyax/lunasphere-web"
VERSION="${1:-dev}"
TAG="${VERSION}"
FULL_IMAGE_NAME="${IMAGE_NAME}:${TAG}"
LATEST_IMAGE_NAME="${IMAGE_NAME}:latest"

echo "🔨 Building Docker image..."
echo "📦 Image: ${FULL_IMAGE_NAME}"
echo "📦 Image: ${LATEST_IMAGE_NAME}"

# Build image
docker build -t "${FULL_IMAGE_NAME}" -t "${LATEST_IMAGE_NAME}" .

echo "✅ Build completed!"
echo "📋 Built images:"
docker images "${IMAGE_NAME}" --format "table {{.Repository}}:{{.Tag}}\t{{.Size}}\t{{.CreatedAt}}"