
const User = require('../models/user'); // Assuming you have a User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        // check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "User created successfully", user: { username, email}});
    } catch (error) {
        res.status(500).json({message: "Server error" });
    }
};


const loginUser = async (req, res) => {
    const { username, password } = req.body;

        console.log('Login route hit'); // Add this line at the beginning of the login route

    try {
        // Check if user exists
        const user = await User.findOne({username});
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }

        // verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        // Generate JWT token
        console.log("JWT_SECRET:", process.env.JWT_SECRET);

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {expiresIn: '1h'});        
        res.json({ token, user: { username: user.username, email: user.email } });
        // res.json({user: {id: user._id, username: user.username }, token });
        // res.status(200).json({ user, token });

    } catch (err) {
        console.error("Error in loginUser: ", err); // Add this line to log the error
        res.status(500).json({message: "Server error" });
    }
};

module.exports = { registerUser, loginUser };

