// src/components/PredictionForm.jsx
import React, { useState } from 'react';
import { getStockData } from '../services/api';

const PredictionForm = ({ onPredict }) => {
  const [ticker, setTicker] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await getStockData(ticker);
      onPredict(data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center">
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          placeholder="Ingresa el símbolo de la acción (ej: AAPL)"
          className="p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
        >
          Predecir
        </button>
      </div>
    </form>
  );
};

export default PredictionForm;