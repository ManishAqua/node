const http = require('http');
const fs = require('fs');
const express = require('express');
const { connectDb } = require('./config/db');
const routes = require('./routes/index');
require('dotenv').config();

const corsMiddleware = require('./middlewares/corsMiddleware');
const helmetMiddleware = require('./middlewares/helmetMiddleware');
const limiterMiddleware = require('./middlewares/rateLimitMiddleware');
const sanitizeMiddleware = require('./middlewares/sanitizeMiddleware');
const logMiddleware = require('./middlewares/logMiddleware');

const app = express();
const hostname = process.env.HOSTNAME;
const port = process.env.PORT || 3000;

// Use middlewares
app.use(corsMiddleware);
app.use(helmetMiddleware);
app.use(limiterMiddleware);
app.use(sanitizeMiddleware);
app.use(logMiddleware);

// Parse incoming JSON
app.use(express.json());

// Set up routes
app.use('/', routes);

// Create HTTP server
const server = http.createServer(app);

// Connect to MongoDB
connectDb()
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    server.listen(port, hostname, () => {
      console.log(`Server running at https://${hostname}:${port}/`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

// Add a route for showing a message on the browser
app.get('/', (req, res) => {
  res.send(`Welcome To Manish's World!`);
});