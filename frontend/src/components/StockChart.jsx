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
import zoomPlugin from 'chartjs-plugin-zoom';
import { calculateSMA, calculateEMA, calculateRSI, calculateMACD } from '../utils/indicators';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  zoomPlugin
);

const StockChart = ({ data }) => {
  if (!data || !data.prices || !Array.isArray(data.prices) || data.prices.length === 0) {
    return <p>No hay datos disponibles para mostrar el gráfico</p>;
  }

  const labels = data.dates || Array.from({ length: data.prices.length }, (_, i) => `Día ${i + 1}`);
  const prices = data.prices;

  const sma = prices.length >= 10 ? calculateSMA(prices, 10) : [];
  const ema = prices.length >= 10 ? calculateEMA(prices, 10) : [];
  const rsi = prices.length >= 14 ? calculateRSI(prices, 14) : [];
  const { macd, signal } = prices.length >= 26 ? calculateMACD(prices) : { macd: [], signal: [] };

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Precio de Cierre',
        data: prices,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        fill: true,
        tension: 0.1,
        pointRadius: 2,
        borderWidth: 2,
      },
      {
        label: 'SMA (10 días)',
        data: sma,
        borderColor: 'rgba(255, 99, 132, 1)',
        borderDash: [5, 5],
        fill: false,
        tension: 0.1,
        pointRadius: 0,
      },
      {
        label: 'EMA (10 días)',
        data: ema,
        borderColor: 'rgba(255, 206, 86, 1)',
        borderDash: [5, 5],
        fill: false,
        tension: 0.1,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Historial de Precios con Indicadores Técnicos' },
      zoom: {
        pan: { enabled: true, mode: 'x' },
        zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'x' },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { maxRotation: 45, minRotation: 45 } },
      y: { position: 'right', grid: { color: 'rgba(0, 0, 0, 0.1)' } },
    },
  };

  return (
    <div>
      <Line data={chartData} options={options} />
      <div className="mt-4 space-y-2">
        <p>
          <strong>RSI (14 días):</strong>{' '}
          {rsi.length ? (
            <>
              {rsi[rsi.length - 1].toFixed(2)}{' '}
              {rsi[rsi.length - 1] > 70
                ? '⚠️ Sobrecomprado'
                : rsi[rsi.length - 1] < 30
                ? '⚠️ Sobrevendido'
                : '✓ Neutral'}
            </>
          ) : (
            'Insuficientes datos para calcular RSI'
          )}
        </p>
        <p>
          <strong>MACD:</strong>{' '}
          {macd.length ? (
            <>
              {macd[macd.length - 1].toFixed(2)} Señal: {signal[signal.length - 1].toFixed(2)}{' '}
              {macd[macd.length - 1] > signal[signal.length - 1] ? '↗️ Señal alcista' : '↘️ Señal bajista'}
            </>
          ) : (
            'Insuficientes datos para calcular MACD'
          )}
        </p>
      </div>
    </div>
  );
};

export default StockChart;