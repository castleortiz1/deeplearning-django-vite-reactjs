// src/components/PredictionForm.jsx
// import React, { useState } from 'react';
// import { getStockData } from '../services/api';
// import StockSearch from './StockSearch';
// import { ClipLoader } from 'react-spinners';
// import './PredictionForm.css';

// const PredictionForm = ({ onPredict }) => {
//   const [ticker, setTicker] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSelectStock = (selectedTicker) => {
//     setTicker(selectedTicker);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!ticker) {
//       setError('Por favor, ingresa un ticker válido.');
//       return;
//     }

//     setIsLoading(true);
//     setError('');

//     try {
//       const data = await getStockData(ticker);
//       if (data) {
//         onPredict(data);
//       } else {
//         setError('No se pudieron obtener los datos de la acción. Verifica el símbolo e intenta nuevamente.');
//       }
//     } catch (error) {
//       console.error('Error obteniendo datos de la acción:', error);
//       setError('Error al obtener los datos de la acción. Verifica tu conexión a internet e intenta nuevamente.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <StockSearch onSelect={handleSelectStock} />
//       {error && (
//         <div className="text-red-500">
//           {error}
//           <p className="text-sm">
//             Sugerencia: Asegúrate de que el símbolo de la acción sea válido (por ejemplo, AAPL para Apple).
//           </p>
//         </div>
//       )}
//       <button
//         type="submit"
//         disabled={isLoading}
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
//       >
//         {isLoading ? <ClipLoader size={20} color="#fff" /> : 'Predecir'}
//       </button>
//     </form>
//   );
// };

// export default PredictionForm;
import React, { useState } from 'react';
import { getStockData } from '../services/api';
import StockSearch from './StockSearch';
import { ClipLoader } from 'react-spinners';
import './PredictionForm.css';

const PredictionForm = ({ onPredict }) => {
  const [ticker, setTicker] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectStock = (selectedTicker) => {
    setTicker(selectedTicker);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ticker) {
      setError('Por favor, ingresa un ticker válido.');
      return;
    }
  
    setIsLoading(true);
    setError('');
  
    try {
      const data = await getStockData(ticker);
      if (data) {
        onPredict(data);
      } else {
        setError('No se pudieron obtener los datos de la acción. Verifica el símbolo e intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error obteniendo datos de la acción:', error);
      setError(error.response?.data?.error || 'Error al obtener los datos de la acción. Verifica tu conexión a internet e intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <StockSearch onSelect={handleSelectStock} />
      {error && (
        <div className="text-red-500">
          {error}
          <p className="text-sm">
            Sugerencia: Asegúrate de que el símbolo de la acción sea válido (por ejemplo, AAPL para Apple).
          </p>
        </div>
      )}
      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isLoading ? <ClipLoader size={20} color="#fff" /> : 'Predecir'}
      </button>
    </form>
  );
};

export default PredictionForm;