
const User = require('../models/user');

// get user profile
const getUserProfile = async (req, res) => {
    try {
        // find the user by the ID (if the id is stored in req.user from the JWT middleware)
        const user = await User.findById(req.user.userId).select('-password'); // exclude password
        if(!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
};

// update user profile
const updateUserProfile = async (req, res) => {
    try {
        const {username, email} = req.body;

        // find user and update their profile details
        const user = await User.findByIdAndUpdate(
            req.user.userId,
            {username, email},
            {new: true, runValidators: true} // returns the updated user and validate input
        ).select('-password'); // exclude password

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        res.json(user);
    } catch  (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile,
};