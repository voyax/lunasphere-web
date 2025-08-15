# Multi-stage build for Next.js application
# Stage 1: Base image with build dependencies
FROM node:18-alpine AS base
RUN apk add --no-cache \
    libc6-compat \
    python3 \
    make \
    g++ \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    musl-dev \
    giflib-dev \
    pixman-dev \
    pangomm-dev \
    libjpeg-turbo-dev \
    freetype-dev && \
    rm -rf /var/cache/apk/*
WORKDIR /app

# Stage 2: Builder
FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED 1

# Copy package files and install dependencies (including devDependencies for build)
COPY package.json package-lock.json* ./
RUN npm ci && \
    npm cache clean --force

# Copy source code and build
COPY . .
RUN npm run build && \
    rm -rf /tmp/* ~/.npm

# Set production environment after build
ENV NODE_ENV production

# Stage 3: Runner
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create nextjs user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy production dependencies
# COPY --from=builder /app/node_modules ./node_modules

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set correct permissions
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Start the application
CMD ["node", "server.js"]