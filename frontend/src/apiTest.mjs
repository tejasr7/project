const { loginUser, getUserProfile } = require( './api/userApi.mjs');

// Login example
const handleLogin = async () => {
    try {
        const data = await loginUser('user@example.com', 'password123');
        console.log('Login success:', data);
    } catch (error) {
        console.error(error);
    }
};

// Get profile example
const fetchProfile = async () => {
    try {
        const profile = await getUserProfile();
        console.log('User profile:', profile);
    } catch (error) {
        console.error(error);
    }
};

// Test the functions
handleLogin();
fetchProfile();
