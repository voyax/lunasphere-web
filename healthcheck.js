const http = require('http');

/**
 * Health check script for Docker container
 * This script checks if the Next.js application is responding correctly
 */

const options = {
  host: 'localhost',
  port: process.env.PORT || 3000,
  path: '/',
  method: 'GET',
  timeout: 2000
};

const request = http.request(options, (res) => {
  console.log(`Health check status: ${res.statusCode}`);
  
  if (res.statusCode === 200) {
    process.exit(0); // Success
  } else {
    console.error(`Health check failed with status: ${res.statusCode}`);
    process.exit(1); // Failure
  }
});

request.on('error', (err) => {
  console.error('Health check request failed:', err.message);
  process.exit(1); // Failure
});

request.on('timeout', () => {
  console.error('Health check request timed out');
  request.destroy();
  process.exit(1); // Failure
});

request.setTimeout(options.timeout);
request.end();