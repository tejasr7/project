const express=require("express");
require('dotenv').config();
// const dotenv = require('dotenv');
const connectDB = require('./config/database');
// for jwt
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// Load environment variables from .env file
// dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Basic route for testing
app.get('/', (req, res) => {
  res.send('API is running');
});

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection Failed: ', err.message));


// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET;

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Define your routes here (e.g., auth, users)
// Example: app.use('/api/users', require('./routes/userRoutes'));

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// app.listen(5001,()=>{
//     console.log("Node js server started");
// })

// 
//tejasranveer01
//8XFZGv7bwpZLYQXT


// Secure Sensitive Data:
//Avoid committing your .env file to version control by including .env in your .gitignore file. 
// This keeps your credentials secure.
