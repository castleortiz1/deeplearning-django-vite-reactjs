// src/components/StockChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom'; // 🔥 Importa el plugin de zoom
import { calculateSMA, calculateEMA, calculateRSI, calculateMACD } from '../utils/indicators';

// 🔥 Registra el plugin de zoom junto con los demás módulos
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  zoomPlugin // 👈 Aquí se registra el plugin correctamente
);

const StockChart = ({ data }) => {
  if (!data || !data.prices || data.prices.length === 0) {
    return <p>No hay datos disponibles</p>;
  }

  const labels = data.labels;
  const prices = data.prices;

  // Cálculo de indicadores
  const sma = calculateSMA(prices, 10);
  const ema = calculateEMA(prices, 10);
  const rsi = calculateRSI(prices, 14);
  const { macd, signal } = calculateMACD(prices, 12, 26, 9);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Precio de Cierre',
        data: prices,
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
        tension: 0.3,
      },
      {
        label: 'SMA (10 días)',
        data: sma,
        borderColor: 'rgba(255, 99, 132, 1)',
        borderDash: [5, 5],
        fill: false,
      },
      {
        label: 'EMA (10 días)',
        data: ema,
        borderColor: 'rgba(255, 206, 86, 1)',
        borderDash: [5, 5],
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Historial de Precios con Indicadores Técnicos',
      },
      zoom: {
        pan: { enabled: true, mode: 'x' },
        zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'x' },
      },
    },
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Gráfico de la Acción</h2>
      <Line data={chartData} options={options} />
      <h3 className="text-lg font-bold mt-4">RSI</h3>
      <p>{rsi.length ? `Último RSI: ${rsi[rsi.length - 1].toFixed(2)}` : 'Calculando...'}</p>
      <h3 className="text-lg font-bold mt-2">MACD</h3>
      <p>{macd.length ? `Último MACD: ${macd[macd.length - 1].toFixed(2)}, Señal: ${signal[signal.length - 1].toFixed(2)}` : 'Calculando...'}</p>
    </div>
  );
};

export default StockChart;
