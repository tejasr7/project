// Generate a JWT token when user athenticates
// When a user logs in or registers, generate a JWT that will be used to authenticate subsequent requests.


// In this code:
// The register route hashes the password and generates a JWT for the user upon successful registration.
// The login route verifies the user's credentials and generates a JWT if they’re correct.

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController'); 

// Secret key for signing the JWT (store securely, e.g., in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'miuGLuZwCXLQhWcXZ/BZkBmsRPhdY+ctaahcc/rrBqM=';

// Registration Route
router.post('/register', registerUser);

// Login Route
router.post('/login', loginUser);


// Register Route
// router.post('/register', async (req, res) => {
//     const { username, password, email } = req.body;

//     try {
//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // create and save the new user
//         const newUser = new User({ username, email, password: hashedPassword });
//         await newUser.save();

//         // Generate JWT
//         const token = jwt.sign({id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

//         res.status(201).json({ user: newUser, token });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// Login route
// router.post('/login', async (req, res) => {
//     console.log('Login route hit'); // Add this line at the beginning of the login route

//     const { username, password } = req.body;

//     try {
//         // find user by username
//         const user = await User.findOne({ username });
//         if(!user) return res.status(404).json({ message: 'User not found'});

//         // compare password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if(!isMatch) return res.status(400).json({message: 'Invalid credentials'});

//         // Generate JWT
//         const token = jwt.sign({ id: user._id}, JWT_SECRET, {expiresIn: '1h'});

//         res.status(200).json({ user, token });
//     } catch (error) {
//         res.status(500).json({message: 'Server error'});
//     }
// });


// Temporary route to check if users are saved
// router.get('/users', async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ message: 'Error retrieving users' });
//     }
// });

module.exports = router;


