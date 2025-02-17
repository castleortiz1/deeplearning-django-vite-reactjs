// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './ErrorBoundary';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
/* src/index.css */
@import "tailwindcss";

body {
  margin: 0;
  font-family: Arial, sans-serif;
  transition: background-color 0.3s, color 0.3s;
}

:root {
  --background: #ffffff;
  --text: #000000;
  --primary: #007bff;
}

.dark {
  --background: #121212;
  --text: #ffffff;
  --primary: #bb86fc;
}

body {
  background-color: var(--background);
  color: var(--text);
}
// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import ThemeToggle from './components/ThemeToggle';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <div className="min-h-screen p-4">
          <ThemeToggle />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
// src/ErrorBoundary.jsx
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Algo salió mal. Por favor, recarga la página.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
// src/theme.js
export const lightTheme = {
    background: '#ffffff',
    text: '#000000',
    primary: '#007bff',
  };
  
  export const darkTheme = {
    background: '#121212',
    text: '#ffffff',
    primary: '#bb86fc',
  };
  // src/ThemeContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { lightTheme, darkTheme } from './theme';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ theme: isDarkMode ? darkTheme : lightTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
// src/utils/indicators.js
export const calculateSMA = (prices, period) => {
  return prices.map((_, index, arr) =>
    index < period - 1 ? null : arr.slice(index - period + 1, index + 1).reduce((a, b) => a + b, 0) / period
  );
};

export const calculateEMA = (prices, period) => {
  const k = 2 / (period + 1);
  let emaArray = [];
  let prevEma = prices[0];

  prices.forEach((price, index) => {
    if (index === 0) {
      emaArray.push(price);
    } else {
      const ema = price * k + prevEma * (1 - k);
      emaArray.push(ema);
      prevEma = ema;
    }
  });

  return emaArray;
};

export const calculateRSI = (prices, period = 14) => {
  let gains = [];
  let losses = [];

  for (let i = 1; i < prices.length; i++) {
    const change = prices[i] - prices[i - 1];
    gains.push(change > 0 ? change : 0);
    losses.push(change < 0 ? Math.abs(change) : 0);
  }

  let avgGain = gains.slice(0, period).reduce((a, b) => a + b, 0) / period;
  let avgLoss = losses.slice(0, period).reduce((a, b) => a + b, 0) / period;
  let rsiArray = [100 - 100 / (1 + avgGain / avgLoss)];

  for (let i = period; i < gains.length; i++) {
    avgGain = (avgGain * (period - 1) + gains[i]) / period;
    avgLoss = (avgLoss * (period - 1) + losses[i]) / period;
    rsiArray.push(100 - 100 / (1 + avgGain / avgLoss));
  }

  return rsiArray;
};

export const calculateMACD = (prices, shortPeriod = 12, longPeriod = 26, signalPeriod = 9) => {
  const shortEMA = calculateEMA(prices, shortPeriod);
  const longEMA = calculateEMA(prices, longPeriod);
  const macdLine = shortEMA.map((val, i) => (val !== null && longEMA[i] !== null ? val - longEMA[i] : null));
  const signalLine = calculateEMA(macdLine.filter((v) => v !== null), signalPeriod);
  return { macd: macdLine, signal: signalLine };
};
// src/services/api.js
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
// src/pages/About.jsx
import React from 'react';

const About = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Acerca de</h1>
      <p className="text-gray-700">
        Esta aplicación utiliza modelos de Deep Learning para predecir los precios de las acciones
        basándose en datos históricos obtenidos de Yahoo Finance. Desarrollada con Django, React y
        TensorFlow.
      </p>
    </div>
  );
};

export default About;
// src/components/ThemeToggle.jsx
import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

const ThemeToggle = () => {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      Cambiar Tema
    </button>
  );
};

export default ThemeToggle;
// src/components/StockSearch.jsx
import React, { useState, useEffect } from 'react';
import { getPopularStocks, searchStocks } from '../services/api';

const StockSearch = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [popularStocks, setPopularStocks] = useState([]);

  useEffect(() => {
    // Obtener acciones populares al cargar el componente
    const fetchPopularStocks = async () => {
      try {
        const data = await getPopularStocks();
        setPopularStocks(data);
      } catch (error) {
        console.error('Error obteniendo acciones populares:', error);
      }
    };
    fetchPopularStocks();
  }, []);

  const handleSearch = async (value) => {
    setQuery(value);
    if (value.length > 1) {
      try {
        const results = await searchStocks(value);
        setSuggestions(results);
      } catch (error) {
        console.error('Error en la búsqueda:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (ticker) => {
    setQuery(ticker);
    setSuggestions([]);
    onSelect(ticker);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Buscar acción (Ej: AAPL, TSLA)"
        className="p-2 border border-gray-300 rounded w-full"
      />
      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border border-gray-300 mt-1 rounded shadow-lg z-10">
          {suggestions.map((stock) => (
            <li
              key={stock.ticker}
              onClick={() => handleSelect(stock.ticker)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {stock.ticker} - {stock.name}
            </li>
          ))}
        </ul>
      )}
      {popularStocks.length > 0 && (
        <div className="mt-2">
          <p className="text-gray-600 text-sm">Acciones populares:</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {popularStocks.map((stock) => (
              <button
                key={stock.ticker}
                onClick={() => handleSelect(stock.ticker)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
              >
                {stock.ticker}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StockSearch;
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
  if (!data || !data.prices || data.prices.length === 0) {
    return <p>No hay datos disponibles</p>;
  }

  const labels = data.dates;  // Usa las fechas devueltas por el backend
  const prices = data.prices;

  // Cálculo de indicadores técnicos
  const sma = calculateSMA(prices, 10);  // Media Móvil Simple (10 días)
  const ema = calculateEMA(prices, 10);  // Media Móvil Exponencial (10 días)
  const rsi = calculateRSI(prices, 14);  // RSI (14 días)
  const { macd, signal } = calculateMACD(prices, 12, 26, 9);  // MACD (12, 26, 9)

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
// src/components/PredictionForm.jsx
import React, { useState } from 'react';
import { getStockData } from '../services/api';
import StockSearch from './StockSearch';

const PredictionForm = ({ onPredict }) => {
  const [ticker, setTicker] = useState('');
  const [error, setError] = useState('');

  const handleSelectStock = (selectedTicker) => {
    setTicker(selectedTicker);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ticker) {
      setError('Por favor, ingresa un ticker válido.');
      return;
    }

    try {
      const data = await getStockData(ticker);
      if (data) {
        onPredict(data);  // Llama a la función onPredict con los datos
        setError('');
      } else {
        setError('No se pudieron obtener los datos de la acción.');
      }
    } catch (error) {
      console.error('Error obteniendo datos de la acción:', error);
      setError('Error al obtener los datos de la acción.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <StockSearch onSelect={handleSelectStock} />
      {error && <p className="text-red-500 mt-2">{error}</p>}
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
// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedComponent from './AnimatedComponent';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Stock Prediction App</h1>
        <AnimatedComponent>
          <div className="space-x-4">
            <Link to="/" className="hover:text-blue-200">
              Inicio
            </Link>
            <Link to="/about" className="hover:text-blue-200">
              Acerca de
            </Link>
          </div>
        </AnimatedComponent>
      </div>
    </nav>
  );
};

export default Navbar;
// src/components/AnimatedComponent.jsx
import { motion } from 'framer-motion';

const AnimatedComponent = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedComponent;