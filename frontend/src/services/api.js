// api.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

export const getPopularStocks = async () => {
    try {
        const response = await apiClient.get('/popular-stocks/');
        return response.data;
    } catch (error) {
        console.error('Error en getPopularStocks:', error.response || error);
        return [];
    }
};

export const getStockData = async (ticker) => {
    try {
        const response = await apiClient.get(`/stock-data/?ticker=${ticker}`);
        return response.data;
    } catch (error) {
        console.error('Error en getStockData:', error.response || error);
        return null;  // Devuelve null en caso de error
    }
};

export const searchStocks = async (query) => {
    try {
        const response = await apiClient.get(`/search-stocks/?q=${query}`);
        return response.data;
    } catch (error) {
        console.error('Error en searchStocks:', error.response || error);
        return [];
    }
};