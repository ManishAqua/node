const cors = require('cors');
require('dotenv').config();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'https://example.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'Authorization'],
  credentials: true,
};

module.exports = cors(corsOptions);
