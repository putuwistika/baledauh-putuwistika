/**
 * 🎊 RuangTamu - Wedding Check-in System
 * Loading Component
 * by PutuWistika
 */

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Loading Component
 * @param {object} props - Component props
 * @param {string} props.size - Size (sm|md|lg)
 * @param {string} props.text - Loading text
 * @param {boolean} props.fullScreen - Full screen overlay
 * @param {string} props.className - Additional CSS classes
 */
const Loading = ({
  size = 'md',
  text,
  fullScreen = false,
  className = '',
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  const spinnerClass = `
    spinner
    ${sizeClasses[size]}
    border-primary-600
  `.trim().replace(/\s+/g, ' ');

  // Loading content
  const loadingContent = (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
    >
      <div className={spinnerClass} />
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 text-sm font-medium"
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  );

  // Full screen variant
  if (fullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
      >
        {loadingContent}
      </motion.div>
    );
  }

  // Inline variant
  return loadingContent;
};

export default Loading;