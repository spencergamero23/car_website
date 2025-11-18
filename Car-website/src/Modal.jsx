import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Modal({ onClose }) {
  return (
    <motion.div
      className="overlay"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <h2>Object</h2>
        <p>This is the object content.</p>
        <div className='object-shopping-link'></div>
        <div className='object-video-link'></div>
        <div className='object-information-section'></div>
        <button className="close-button" onClick={onClose}>
          ❌
        </button>
      </motion.div>
    </motion.div>
  );
}

export default Modal;
