// src/services/api.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

const getAuthToken = () => localStorage.getItem('access_token');

const setAuthHeader = () => {
  const token = getAuthToken();
  if (token) {
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers['Authorization'];
  }
};

export const getPopularStocks = async () => {
    try {
        const response = await apiClient.get('/stocks/popular/');
        return response.data;
    } catch (error) {
        console.error('Error en getPopularStocks:', error.response?.data || error.message);
        return [];
    }
};

const getPopularStocks = async () => {
    try {
        const response = await apiClient.get('/stocks/popular/');
        return response.data;
    } catch (error) {
        console.error('Error en getPopularStocks:', error.response?.data || error.message);
        return [];
    }
};
export default getPopularStocks;

export const login = async (username, password) => {
  try {
    const response = await apiClient.post('/auth/token/', { username, password });
    const { access } = response.data;
    localStorage.setItem('access_token', access);
    setAuthHeader();
    return true;
  } catch (error) {
    console.error('Error al iniciar sesión:', error.response?.data || error.message);
    return false;
  }
};