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
