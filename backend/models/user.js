// Create Mongoose Models: Start by defining your data schema using Mongoose. 
// This will allow you to interact with your MongoDB collections easily. For example, 
// if you’re building a user system, you might create a User model.


const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type : String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    // add other fields as necessary
});

const User = mongoose.model('User', UserSchema);
module.exports = User;