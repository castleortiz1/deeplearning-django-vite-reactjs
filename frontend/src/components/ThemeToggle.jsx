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