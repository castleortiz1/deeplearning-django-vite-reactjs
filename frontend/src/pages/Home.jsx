// src/pages/Home.jsx
import React, { useState } from 'react';
import StockChart from '../components/StockChart';
import PredictionForm from '../components/PredictionForm';

const Home = () => {
  const [stockData, setStockData] = useState({ labels: [], prices: [] });

  const handlePredict = (data) => {
    const labels = data.map((item) => item.date);
    const prices = data.map((item) => item.close_price);
    setStockData({ labels, prices });
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