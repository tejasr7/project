// src/api/userApi.js

// const api = require('../axios');
import api from '../axios.mjs';
// import AsyncStorage from '@react-native-async-storage/async-storage';


// Example function for loggin in a user
const loginUser = async (email, password) => {
    try {
        const response = await api.post('/login', { email, password });
        // store the token in localStorage or AsyncStorage
        const { token } = respon2se.data;
        localStorage.setItem('token', token); // use asyncStorage.setItem('token', token) in React Native
        return response.data;
    } catch (error) {
        console.error('Error loggin in: ', error);
        throw error;
    }
};


// exmaple function for getting user profile
const getUserProfile = async () => {
    try {
        const response = await api.get('/user/profile');
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile: ', error);
        throw error;
    }
};

module.exports = { loginUser, getUserProfile };
