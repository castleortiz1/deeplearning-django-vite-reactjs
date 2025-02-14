// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';  // URL de la API de Django

// Obtener datos históricos de una acción
export const getStockData = async (ticker) => {
  try {
    const response = await axios.get(`${API_URL}/stock-data/${ticker}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};

// Obtener la predicción del modelo (si es necesario)
export const getPrediction = async (ticker) => {
  try {
    const response = await axios.get(`${API_URL}/predict/${ticker}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching prediction:', error);
    throw error;
  }
};