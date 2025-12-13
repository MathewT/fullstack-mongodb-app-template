const { connectToDatabase } = require('./db/connection');
const Item = require('./models/Item');

console.log('Lambda handler module loaded');

// Response helper
function createResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    },
    body: JSON.stringify(body)
  };
}

// Parse route and method
function parseRequest(event) {
  const path = event.path || event.rawPath || '/';
  const method = event.httpMethod || event.requestContext?.http?.method || 'GET';
  const pathSegments = path.split('/').filter(Boolean);
  
  return {
    method,
    path,
    pathSegments,
    resource: pathSegments[0] || '',
    id: pathSegments[1] || null,
    body: event.body ? JSON.parse(event.body) : null
  };
}

// Route Handlers
const handlers = {
  // GET /items - List all items
  async getItems() {
    try {
      const items = await Item.find().sort({ createdAt: -1 });
      return createResponse(200, { success: true, data: items });
    } catch (error) {
      console.error('Error fetching items:', error);
      return createResponse(500, { success: false, error: error.message });
    }
  },

  // GET /items/:id - Get single item
  async getItem(id) {
    try {
      const item = await Item.findById(id);
      if (!item) {
        return createResponse(404, { success: false, error: 'Item not found' });
      }
      return createResponse(200, { success: true, data: item });
    } catch (error) {
      console.error('Error fetching item:', error);
      return createResponse(500, { success: false, error: error.message });
    }
  },

  // POST /items - Create new item
  async createItem(data) {
    try {
      const item = new Item(data);
      await item.save();
      return createResponse(201, { success: true, data: item });
    } catch (error) {
      console.error('Error creating item:', error);
      return createResponse(400, { success: false, error: error.message });
    }
  },

  // PUT /items/:id - Update item
  async updateItem(id, data) {
    try {
      const item = await Item.findByIdAndUpdate(
        id,
        { ...data, updatedAt: Date.now() },
        { new: true, runValidators: true }
      );
      
      if (!item) {
        return createResponse(404, { success: false, error: 'Item not found' });
      }
      
      return createResponse(200, { success: true, data: item });
    } catch (error) {
      console.error('Error updating item:', error);
      return createResponse(400, { success: false, error: error.message });
    }
  },

  // DELETE /items/:id - Delete item
  async deleteItem(id) {
    try {
      const item = await Item.findByIdAndDelete(id);
      
      if (!item) {
        return createResponse(404, { success: false, error: 'Item not found' });
      }
      
      return createResponse(200, { success: true, data: { message: 'Item deleted' } });
    } catch (error) {
      console.error('Error deleting item:', error);
      return createResponse(500, { success: false, error: error.message });
    }
  }
};

// Main Lambda Handler
exports.handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));

  // Handle OPTIONS for CORS
  if (event.httpMethod === 'OPTIONS' || event.requestContext?.http?.method === 'OPTIONS') {
    return createResponse(200, { success: true });
  }

  try {
    // Connect to database
    await connectToDatabase();

    // Parse request
    const request = parseRequest(event);
    console.log('Parsed request:', request);

    // Route the request
    if (request.resource === 'items') {
      if (request.method === 'GET') {
        if (request.id) {
          return await handlers.getItem(request.id);
        }
        return await handlers.getItems();
      }
      
      if (request.method === 'POST') {
        return await handlers.createItem(request.body);
      }
      
      if (request.method === 'PUT' && request.id) {
        return await handlers.updateItem(request.id, request.body);
      }
      
      if (request.method === 'DELETE' && request.id) {
        return await handlers.deleteItem(request.id);
      }
    }

    // Handle health check
    if (request.path === '/health' || request.path === '/') {
      return createResponse(200, { 
        success: true, 
        message: 'API is running',
        timestamp: new Date().toISOString()
      });
    }

    // Route not found
    return createResponse(404, { 
      success: false, 
      error: 'Route not found',
      path: request.path,
      method: request.method
    });

  } catch (error) {
    console.error('Lambda error:', error);
    return createResponse(500, { 
      success: false, 
      error: 'Internal server error',
      message: error.message 
    });
  }
};
