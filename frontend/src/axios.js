// 

import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// create an Axios instance
const api = axios.create({
    baseURL: 'http://localhost:5001/api', // set your API base URL here
});

// add a request interceptor to attact the token to AsyncStorage
api.interceptors.request.use(
    async (config) => {
        // Get the token from localStorage or AsyncStorage
        const token = localStorage.getItem('token'); // use asyncStorage.getItem('token') in react native

        if(token) {
            config.headers.Authorization = 'Bearer $(token)';
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);
export default api;