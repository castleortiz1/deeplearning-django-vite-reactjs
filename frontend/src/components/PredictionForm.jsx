import React, { useState } from 'react';
import { getStockData } from '../services/api';
import StockSearch from './StockSearch';

const PredictionForm = ({ onPredict }) => {
  const [ticker, setTicker] = useState('');

  const handleSelectStock = (selectedTicker) => {
    setTicker(selectedTicker);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ticker) return;
    try {
      const data = await getStockData(ticker);
      onPredict(data);
    } catch (error) {
      console.error('Error obteniendo datos de la acción:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <StockSearch onSelect={handleSelectStock} />
      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Predecir
      </button>
    </form>
  );
};

export default PredictionForm;
