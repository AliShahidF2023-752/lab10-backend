const express = require('express');
const cors = require('cors');
const bmiRoutes = require('./routes/bmi');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: '*', // allow requests from any origin
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Middleware
app.use(cors(corsOptions)); // apply CORS globally
app.use(express.json());

// Logging Middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Request received: ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use('/api/bmi', bmiRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('BMI Calculator API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
