// const express = require('express');
// const app = express();
// const port = 3000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.listen(port, (err) => {
//     if (err) {
//         return console.log('Something bad happened', err);
//     }
//     console.log(`Server is listening on ${port}`);
// });



// module.exports = app;

require('dotenv').config();
const express = require('express');
const config = require('./src/config/config');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/users', require('./src/routes/userRoutes'));
app.use('/news', require('./src/routes/newsRoutes'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const port = config.port;
const server = app.listen(port, (err) => {
  if (err) {
    return console.error('Failed to start server:', err);
  }
  console.log(`Server is running on port ${port}`);
  console.log(`Health check: http://localhost:${port}/health`);
});

module.exports = { app, server };
