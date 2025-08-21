#!/bin/bash

# Simple Docker build script for pre-built application
# This script assumes you have already run 'npm run build' locally

set -e  # Exit on any error

echo "🐳 Building Docker image from pre-built files..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed and running
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

if ! docker info &> /dev/null; then
    print_error "Docker is not running. Please start Docker first."
    exit 1
fi

# Check if build files exist
if [ ! -d ".next" ]; then
    print_error "No .next directory found. Please run 'npm run build' first."
    exit 1
fi

if [ ! -d ".next/standalone" ]; then
    print_error "No .next/standalone directory found. Make sure Next.js is configured for standalone output."
    exit 1
fi

print_status "Found pre-built files in .next directory"

# Get image name and tag (following build.sh naming convention)
IMAGE_NAME="voyax/lunasphere-web"
VERSION="${1:-dev}"
TAG="${VERSION}"
FULL_IMAGE_NAME="${IMAGE_NAME}:${TAG}"
LATEST_IMAGE_NAME="${IMAGE_NAME}:latest"

print_status "Building Docker image: ${FULL_IMAGE_NAME}"
print_status "Building Docker image: ${LATEST_IMAGE_NAME}"

# Temporarily use local dockerignore to allow .next directory
if [ -f ".dockerignore" ]; then
    mv .dockerignore .dockerignore.backup
    print_status "Backed up original .dockerignore"
fi

if [ -f ".dockerignore.local" ]; then
    cp .dockerignore.local .dockerignore
    print_status "Using local .dockerignore for build"
fi

# Build Docker image using the optimized Dockerfile
docker build -f Dockerfile.local -t "${FULL_IMAGE_NAME}" -t "${LATEST_IMAGE_NAME}" .
BUILD_RESULT=$?

# Restore original dockerignore
if [ -f ".dockerignore.backup" ]; then
    mv .dockerignore.backup .dockerignore
    print_status "Restored original .dockerignore"
else
    rm -f .dockerignore
fi

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

echo ""
print_status "💡 Tip: To rebuild the app, run 'npm run build' then run this script again."