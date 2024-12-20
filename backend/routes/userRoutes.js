// Define Routes: Set up routes for your application using Express.
// For example, you might want to create routes for user registration, login, and profile management.


const express = require('express');
const User = require('../models/user');
const router =  express.Router();
const authenticateToken = require('../middleware/authMiddleware');
// to get the user profile from userController
const { getUserProfile, updateUserProfile } = require('../controllers/userController');



// POST: Register a new user
router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const newUser = new User({ username, password, email});
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}); // this is where a new user object is created and saved to the database.


// Protect this route so only authenticated users can access it.
// GET: Get User profile (protected route)
router.get('/profile', authenticateToken, getUserProfile);

// PUT: Update user profile (protected route) 
router.put('./profile', authenticateToken, updateUserProfile);


// protected route: Get user profile
// router.get('/profile', authenticateToken, async(req, res) => {
//     try {
//         const user = await User.findById(req.user.id);
//         if(!user) return res.status(404).json({ message: 'User not found'});
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error'});
//     }
// });

module.exports = router;



// The /profile route is protected, so only users with a valid JWT token can access it.
// The authenticateToken middleware checks the token, and req.user.id is available to use within the route if authentication is successful.
