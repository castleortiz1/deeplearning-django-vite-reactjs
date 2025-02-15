// api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true
});

// Modificar la función getPopularStocks
export const getPopularStocks = async () => {
    try {
        const response = await apiClient.get('/popular-stocks/');
        console.log('Response:', response);  // Para debugging
        return response.data;
    } catch (error) {
        console.error('Error detallado:', error.response || error);  // Mejor logging
        return [];
    }
};