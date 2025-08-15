#!/bin/bash

# Simple Docker push script
# Usage: ./push.sh [version]

set -e

# Configuration
IMAGE_NAME="voyax/head-start-web"
VERSION="${1:-dev}"
GIT_HASH=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")

# Check if version already contains git hash
if [[ "$VERSION" == *"-"* ]]; then
    TAG="$VERSION"
else
    TAG="${VERSION}-${GIT_HASH}"
fi

echo "🚀 Pushing Docker images..."
echo "📦 Pushing: ${IMAGE_NAME}:${TAG}"
echo "📦 Pushing: ${IMAGE_NAME}:latest"

# Check if images exist
if ! docker image inspect "${IMAGE_NAME}:${TAG}" >/dev/null 2>&1; then
    echo "❌ Error: Image ${IMAGE_NAME}:${TAG} not found"
    echo "💡 Please build the image first: ./build.sh ${VERSION}"
    exit 1
fi

# Push images
docker push "${IMAGE_NAME}:${TAG}"
docker push "${IMAGE_NAME}:latest"

echo "✅ Push completed!"
echo "🌐 Images available at:"
echo "   - ${IMAGE_NAME}:${TAG}"
echo "   - ${IMAGE_NAME}:latest"