// Initialize database with a user for the application
db = db.getSiblingDB('appdb');

db.createUser({
  user: 'appuser',
  pwd: 'apppassword',
  roles: [
    {
      role: 'readWrite',
      db: 'appdb'
    }
  ]
});

// Create initial collection
db.createCollection('items');

console.log('Database initialized successfully');
