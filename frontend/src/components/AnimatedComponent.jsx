// src/components/AnimatedComponent.jsx
import { motion } from 'framer-motion'; // Corregir el espacio extra

const AnimatedComponent = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedComponent;