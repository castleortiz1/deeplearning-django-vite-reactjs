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