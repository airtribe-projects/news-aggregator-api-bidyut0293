require('dotenv').config();
const app = require('./app');
const config = require('./src/config/config');

const port = config.port;
app.listen(port, (err) => {
  if (err) {
    return console.error('Failed to start server:', err);
  }
  console.log(`Server is running on port ${port}`);
  console.log(`Health check: http://localhost:${port}/health`);
});
