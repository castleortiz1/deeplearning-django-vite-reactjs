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
