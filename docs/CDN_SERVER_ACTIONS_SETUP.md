# CDN + Server Actions Configuration Guide

## Problem Description

When accessing a Next.js application through a CDN accelerated domain, Server Actions (such as language switching functionality) may fail, while direct access to the origin server works normally. This occurs because Next.js 15 Server Actions validate the `Origin` header of requests, and when the CDN domain doesn't match the origin server domain, requests are rejected.

## Solution

### 1. Next.js Configuration

Server Actions domain whitelist configuration has been added to `next.config.js`:

```javascript
experimental: {
  serverActions: {
    allowedOrigins: [
      // 开发环境
      'localhost:3000',
      'localhost:3001',
      // CDN 域名
      ...(process.env.NEXT_PUBLIC_CDN_DOMAIN 
        ? [process.env.NEXT_PUBLIC_CDN_DOMAIN.replace(/^https?:\/\//, '')] 
        : []),
      // 源站域名
      ...(process.env.NEXT_PUBLIC_APP_URL 
        ? [process.env.NEXT_PUBLIC_APP_URL.replace(/^https?:\/\//, '')] 
        : []),
    ],
    allowedForwardedHosts: [
      // 反向代理配置
    ],
  },
}
```

### 2. Environment Variables Configuration

Add the following to your production `.env.production` file:

```bash
# CDN domain (if using CDN acceleration)
NEXT_PUBLIC_CDN_DOMAIN=https://your-cdn-domain.com

# Origin server domain
NEXT_PUBLIC_APP_URL=https://your-origin-server.com

# Additional allowed domains (comma-separated)
NEXT_PUBLIC_ALLOWED_ORIGINS=domain1.com,domain2.com
```

### 3. Caddy Configuration

Refer to the `Caddyfile.example` file to ensure proper header forwarding:

```caddyfile
your-cdn-domain.com {
    reverse_proxy your-origin-server.com:3000 {
        # Preserve original header information
        header_up Host {upstream_hostport}
        header_up X-Forwarded-For {remote_host}
        header_up X-Forwarded-Proto {scheme}
        header_up X-Forwarded-Host {host}
        
        # Important: Set correct Origin for Server Actions
        header_up Origin "https://your-cdn-domain.com"
    }
}
```

## Configuration Steps

### Step 1: Update Environment Variables

1. Copy `.env.example` to `.env.production`
2. Set correct CDN domain and origin server domain
3. If you have multiple domains, add them to `NEXT_PUBLIC_ALLOWED_ORIGINS`

### Step 2: Configure Caddy

1. Use `Caddyfile.example` as a template
2. Replace example domains with actual domains
3. Ensure `Origin` header is correctly set
4. Restart Caddy service

### Step 3: Rebuild and Deploy

```bash
# Rebuild the application
npm run build

# Restart Next.js service
pm2 restart your-app
# or
systemctl restart your-nextjs-service
```

## Troubleshooting

### 1. Check Server Actions Errors

Inspect failed POST requests in the browser's developer tools network panel:

- **400 Bad Request**: Usually Origin header validation failure
- **Connection closed**: Possible header forwarding configuration issue
- **Missing 'next-action' header**: Client-side invocation issue

### 2. Verify Header Forwarding

Add debug logging to your Next.js application:

```javascript
// Add to Server Action
console.log('Request headers:', {
  origin: headers().get('origin'),
  host: headers().get('host'),
  'x-forwarded-host': headers().get('x-forwarded-host'),
  'x-forwarded-proto': headers().get('x-forwarded-proto'),
});
```

### 3. Test Configuration

```bash
# Test CDN domain access
curl -X POST https://your-cdn-domain.com/api/your-action \
  -H "Origin: https://your-cdn-domain.com" \
  -H "Content-Type: application/json"

# Test direct origin server access
curl -X POST https://your-origin-server.com/api/your-action \
  -H "Origin: https://your-origin-server.com" \
  -H "Content-Type: application/json"
```

### 4. Common Issues

**Issue**: Server Actions fail when accessing via CDN domain
**Solution**: Ensure `NEXT_PUBLIC_CDN_DOMAIN` is set and included in `allowedOrigins`

**Issue**: Incorrect header forwarding
**Solution**: Check `header_up` directives in Caddy configuration

**Issue**: Multiple CDN domains
**Solution**: Use `NEXT_PUBLIC_ALLOWED_ORIGINS` to add all domains

## Security Considerations

1. **Domain Validation**: Only add trusted domains to the allow list
2. **HTTPS**: Ensure all domains use HTTPS
3. **Header Validation**: Regularly check forwarded header information
4. **Log Monitoring**: Monitor failed Server Actions requests

## Performance Optimization

1. **Caching Strategy**: Set appropriate cache headers for static resources
2. **Compression**: Enable gzip/brotli compression
3. **Connection Reuse**: Configure HTTP/2 and connection pooling
4. **Health Checks**: Set up appropriate health check endpoints

## Monitoring and Logging

Recommended metrics to monitor:

- Server Actions success rate
- Response time
- Origin validation failures in error logs
- CDN cache hit rate

With the above configuration, your Next.js application should be able to use Server Actions functionality normally under a CDN + origin server architecture.