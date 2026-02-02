require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import Routes
const authRoutes = require('./router/authRoutes');
const bookRoutes = require('./router/bookRoutes');
const reviewRoutes = require('./router/reviewRoutes');

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
// Nest reviews under books (e.g., /api/books/:bookId/reviews)
app.use('/api/books/:bookId/reviews', reviewRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));