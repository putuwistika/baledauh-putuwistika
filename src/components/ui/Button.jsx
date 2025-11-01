/**
 * 🎊 RuangTamu - Wedding Check-in System
 * Button Component
 * by PutuWistika
 */

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Button Component
 * @param {object} props - Component props
 * @param {string} props.variant - Button variant (primary|secondary|success|danger|ghost|outline)
 * @param {string} props.size - Button size (sm|md|lg)
 * @param {boolean} props.loading - Loading state
 * @param {boolean} props.disabled - Disabled state
 * @param {React.ReactNode} props.children - Button content
 * @param {React.ReactNode} props.leftIcon - Left icon
 * @param {React.ReactNode} props.rightIcon - Right icon
 * @param {boolean} props.fullWidth - Full width button
 * @param {string} props.className - Additional CSS classes
 * @param {function} props.onClick - Click handler
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  children,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
  ...rest
}) => {
  // Variant classes
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    danger: 'btn-danger',
    ghost: 'btn-ghost',
    outline: 'btn-outline',
  };

  // Size classes
  const sizeClasses = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
  };

  // Combined classes
  const buttonClasses = `
    btn
    ${variantClasses[variant] || variantClasses.primary}
    ${sizeClasses[size] || ''}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <motion.button
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {/* Left Icon */}
      {leftIcon && !loading && (
        <span className="inline-flex items-center">
          {leftIcon}
        </span>
      )}

      {/* Loading Spinner */}
      {loading && (
        <span className="spinner w-4 h-4" />
      )}

      {/* Button Content */}
      {!loading && children}

      {/* Right Icon */}
      {rightIcon && !loading && (
        <span className="inline-flex items-center">
          {rightIcon}
        </span>
      )}
    </motion.button>
  );
};

export default Button;