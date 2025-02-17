// src/pages/Home.jsx
import React, { useState } from 'react';
import StockChart from '../components/StockChart';
import PredictionForm from '../components/PredictionForm';

const Home = () => {
  const [stockData, setStockData] = useState({ labels: [], prices: [] });

  const handlePredict = (data) => {
    if (data && data.prices && data.dates) {
      const labels = data.dates;  // Usa las fechas devueltas por el backend
      const prices = data.prices;
      setStockData({ labels, prices });
    } else {
      console.error('Datos no válidos para predicción');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Predicción de la Bolsa de Valores</h1>
      <PredictionForm onPredict={handlePredict} />
      <StockChart data={stockData} />
    </div>
  );
};

export default Home;