const express = require('express');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Node.js MySQL API Server',
    version: '1.0.0',
    endpoints: {
      users: '/api/users'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
