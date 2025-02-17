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

// Obtener acciones populares
export const getPopularStocks = async () => {
  try {
    const response = await apiClient.get('/stocks/popular/');
    return response.data;
  } catch (error) {
    console.error('Error en getPopularStocks:', error.response?.data || error.message);
    return [];
  }
};

// Buscar acciones
export const searchStocks = async (query) => {
  try {
    const response = await apiClient.get(`/stocks/search/?q=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error en searchStocks:', error.response?.data || error.message);
    return [];
  }
};

// Obtener datos de una acción
// export const getStockData = async (ticker) => {
//   try {
//     const response = await apiClient.get(`/stocks/data/?ticker=${ticker}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error en getStockData:', error.response?.data || error.message);
//     return null;
//   }
// };
export const getStockData = async (ticker) => {
  try {
    const response = await apiClient.get(`/stocks/data/?ticker=${ticker}`);
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    return response.data;
  } catch (error) {
    console.error('Error en getStockData:', error.message);
    throw error; // Lanza el error para que pueda ser manejado en el componente
  }
};

// Registrar un nuevo usuario
export const registerUser = async (username, email, password) => {
  try {
    const response = await apiClient.post('/auth/register/', {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error en registerUser:', error.response?.data || error.message);
    return null;
  }
};

// Iniciar sesión
export const login = async (username, password) => {
  try {
    const response = await apiClient.post('/auth/token/', { username, password });
    const { access } = response.data;
    localStorage.setItem('access_token', access);
    setAuthHeader();
    return true;
  } catch (error) {
    console.error('Error en login:', error.response?.data || error.message);
    return false;
  }
};

// Obtener acciones favoritas
export const getFavoriteStocks = async () => {
  try {
    setAuthHeader();
    const response = await apiClient.get('/auth/favorites/');
    return response.data;
  } catch (error) {
    console.error('Error en getFavoriteStocks:', error.response?.data || error.message);
    return [];
  }
};

// Agregar una acción a favoritos
export const addFavoriteStock = async (ticker) => {
  try {
    setAuthHeader();
    const response = await apiClient.post('/auth/favorites/', { ticker });
    return response.data;
  } catch (error) {
    console.error('Error en addFavoriteStock:', error.response?.data || error.message);
    return null;
  }
};

// Eliminar una acción de favoritos
export const removeFavoriteStock = async (ticker) => {
  try {
    setAuthHeader();
    const response = await apiClient.delete(`/auth/favorites/${ticker}/`);
    return response.data;
  } catch (error) {
    console.error('Error en removeFavoriteStock:', error.response?.data || error.message);
    return null;
  }
};

// Acceder a una vista protegida
export const accessProtectedView = async () => {
  try {
    setAuthHeader();
    const response = await apiClient.get('/api/protected/');
    return response.data;
  } catch (error) {
    console.error('Error en accessProtectedView:', error.response?.data || error.message);
    return null;
  }
};