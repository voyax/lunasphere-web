/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // Enable standalone output for Docker deployment
  turbopack: {
    resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
  },
  experimental: {
    serverActions: {
      // Fix for CDN + origin server setup where CDN domain differs from origin
      // This resolves Server Actions origin header validation issues
      allowedOrigins: [
        // Local development
        'localhost:3000',
        'localhost:3001',
        '127.0.0.1:3000',
        '0.0.0.0:3000',

        // CDN domains - add your CDN domain here
        // Example: 'cdn.yourdomain.com', 'static.yourdomain.com'
        ...(process.env.NEXT_PUBLIC_CDN_DOMAIN 
          ? [process.env.NEXT_PUBLIC_CDN_DOMAIN.replace(/^https?:\/\//, '')] 
          : []),
        // Origin server domain
        ...(process.env.NEXT_PUBLIC_APP_URL 
          ? [process.env.NEXT_PUBLIC_APP_URL.replace(/^https?:\/\//, '')] 
          : []),
        // Add any additional domains that might access your app
        ...(process.env.NEXT_PUBLIC_ALLOWED_ORIGINS 
          ? process.env.NEXT_PUBLIC_ALLOWED_ORIGINS.split(',').map(domain => domain.trim()) 
          : []),
      ].filter(Boolean),
      // Allow forwarded hosts for reverse proxy setups (Caddy, Nginx, etc.)
      allowedForwardedHosts: [
        'localhost:3000',
        'localhost:3001',
        '127.0.0.1:3000',
        '0.0.0.0:3000',
        // CDN and origin domains
        ...(process.env.NEXT_PUBLIC_CDN_DOMAIN 
          ? [process.env.NEXT_PUBLIC_CDN_DOMAIN.replace(/^https?:\/\//, '')] 
          : []),
        ...(process.env.NEXT_PUBLIC_APP_URL 
          ? [process.env.NEXT_PUBLIC_APP_URL.replace(/^https?:\/\//, '')] 
          : []),
        ...(process.env.NEXT_PUBLIC_ALLOWED_ORIGINS 
          ? process.env.NEXT_PUBLIC_ALLOWED_ORIGINS.split(',').map(domain => domain.trim()) 
          : []),
      ].filter(Boolean),
    },
  },
};

module.exports = nextConfig;
