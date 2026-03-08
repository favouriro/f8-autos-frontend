import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Create an axios instance with the base URL
const api = axios.create({
    baseURL: API_URL,
});

// Automatically attach the JWT token to every request if one exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth
export const register = (data) => api.post('/auth/register/', data);
export const login = (data) => api.post('/token/', data);

// Cars
export const getCars = () => api.get('/cars/');
export const getCar = (id) => api.get(`/cars/${id}/`);

// Services
export const getServices = () => api.get('/services/');
export const getService = (id) => api.get(`/services/${id}/`);

// Bookings
export const getBookings = () => api.get('/bookings/');
export const createBooking = (data) => api.post('/bookings/', data);

// Profile
export const getProfile = () => api.get('/auth/profile/');

export default api;