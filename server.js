const express = require('express');
const cors = require('cors');
const bmiRoutes = require('./routes/bmi');

const app = express();
const PORT = process.env.PORT || 5000;

// Allowed frontend origins
const allowedOrigins = [
  'https://dolphin-app-q6npv.ondigitalocean.app', // your DigitalOcean app
  'https://shavon-lentando-noninformatively.ngrok-free.dev', // ngrok URL
  'http://localhost:3000',                        // local Next.js
  'http://localhost:5173'                         // local Vite
];

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (Postman, curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS not allowed for origin ${origin}`));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // must be true if you want cookies/auth
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] Request received: ${req.method} ${req.originalUrl}`);
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
