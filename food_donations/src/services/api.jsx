// src/services/api.js
import axios from 'axios';
import { getAuthTokens } from './auth';

// Configure axios instance
const api = axios.create({
  
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// Add this to your api.js to log requests
api.interceptors.request.use(config => {
  console.log('Making request to:', config.url);
  console.log('Request data:', config.data);
  console.log('Headers:', config.headers);
  return config;
});

// Add response interceptor to handle token refresh
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const { refresh } = getAuthTokens();
    
    if (error.response?.status === 401 && !originalRequest._retry && refresh) {
      originalRequest._retry = true;
      
      try {
        const response = await axios.post('http://localhost:8000/api/token/refresh/', {
          refresh
        });
        
        const { access } = response.data;
        localStorage.setItem('access_token', access);
        axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
        originalRequest.headers['Authorization'] = `Bearer ${access}`;
        
        return api(originalRequest);
      } catch (err) {
        console.error('Refresh token failed', err);
        // Redirect to login or handle token refresh failure
        return Promise.reject(err);
      }
    }
    
    return Promise.reject(error);
  }
);
// Add authorization header if using token authentication

export const loginUser = async (email, password) => {
  const response = await api.post('/login/', { email, password });
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post('/register/', userData);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get('/profile/');
  return response.data;
};

export default api;