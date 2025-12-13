const http = require('http');
const { handler } = require('./index');

const PORT = process.env.PORT || 9000;

const server = http.createServer(async (req, res) => {
  // Collect request body
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    // Create Lambda-like event object
    const event = {
      httpMethod: req.method,
      path: req.url,
      headers: req.headers,
      body: body || null,
      requestContext: {
        http: {
          method: req.method,
          path: req.url
        }
      }
    };

    try {
      // Call Lambda handler
      const response = await handler(event);
      
      // Send response
      res.writeHead(response.statusCode, response.headers);
      res.end(response.body);
    } catch (error) {
      console.error('Server error:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal server error' }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Environment:', process.env.NODE_ENV || 'development');
  console.log('MongoDB URI:', process.env.MONGODB_URI || 'mongodb://mongodb:27017/appdb');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});
