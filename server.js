import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import urlRoutes from './routes/urlRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// API Routes
app.use('/api', authRoutes);
app.use('/url', urlRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((error) => console.error('MongoDB Connection Error:', error));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
