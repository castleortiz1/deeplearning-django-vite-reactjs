// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Stock Prediction App</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-200">
            Inicio
          </Link>
          <Link to="/about" className="hover:text-blue-200">
            Acerca de
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;