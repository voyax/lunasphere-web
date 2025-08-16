#!/bin/bash

# Simple Docker build script
# Usage: ./build.sh [version]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Configuration
IMAGE_NAME="voyax/head-start-web"
VERSION="${1:-dev}"
TAG="${VERSION}"
FULL_IMAGE_NAME="${IMAGE_NAME}:${TAG}"
LATEST_IMAGE_NAME="${IMAGE_NAME}:latest"

echo "🔨 Building Docker image..."
print_status "Building Docker image: ${FULL_IMAGE_NAME}"
print_status "Building Docker image: ${LATEST_IMAGE_NAME}"

# Build image
docker build -t "${FULL_IMAGE_NAME}" -t "${LATEST_IMAGE_NAME}" .
BUILD_RESULT=$?

if [ $BUILD_RESULT -eq 0 ]; then
    print_status "Docker image built successfully: ${FULL_IMAGE_NAME}"
    print_status "Docker image built successfully: ${LATEST_IMAGE_NAME}"
    
    echo ""
    print_status "🎉 Docker build completed successfully!"
    echo "📋 Built images:"
    docker images "${IMAGE_NAME}" --format "table {{.Repository}}:{{.Tag}}\t{{.Size}}\t{{.CreatedAt}}"
    
    echo ""
    echo -e "${GREEN}To run the container:${NC}"
    echo "  docker run -p 3000:3000 ${FULL_IMAGE_NAME}"
    echo "  docker run -p 3000:3000 ${LATEST_IMAGE_NAME}"
    echo ""
    echo -e "${GREEN}To push to registry:${NC}"
    echo "  docker push ${FULL_IMAGE_NAME}"
    echo "  docker push ${LATEST_IMAGE_NAME}"
else
    print_error "Docker build failed!"
    exit 1
fi