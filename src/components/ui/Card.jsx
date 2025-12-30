/**
 * 🎊 RuangTamu - Wedding Check-in System
 * Card Component - Reusable card wrapper
 * by PutuWistika
 */

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@utils/helpers';

/**
 * Card Component
 * Reusable card wrapper with variants
 */
const Card = ({
  children,
  className = '',
  variant = 'default',
  hover = false,
  padding = 'default',
  onClick,
  ...props
}) => {
  // Variant styles
  const variants = {
    default: 'bg-white border border-gray-200',
    primary: 'bg-primary-50 border border-primary-200',
    success: 'bg-green-50 border border-green-200',
    warning: 'bg-yellow-50 border border-yellow-200',
    error: 'bg-red-50 border border-red-200',
    glass: 'bg-white/80 backdrop-blur-lg border border-white/20',
  };

  // Padding styles
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
  };

  // Base classes
  const baseClasses = cn(
    'rounded-xl shadow-baleda transition-all duration-200',
    variants[variant],
    paddings[padding],
    hover && 'hover:shadow-gold hover:-translate-y-1 cursor-pointer',
    onClick && 'cursor-pointer',
    className
  );

  // If hover animation needed, wrap with motion
  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
        transition={{ duration: 0.2 }}
        className={baseClasses}
        onClick={onClick}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={baseClasses} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

/**
 * CardHeader Component
 * Header section of card with title and actions
 */
export const CardHeader = ({ 
  children, 
  className = '',
  title,
  subtitle,
  action,
  ...props 
}) => {
  if (title || subtitle || action) {
    return (
      <div className={cn('mb-4', className)} {...props}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            {title && (
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-600">{subtitle}</p>
            )}
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  );
};

/**
 * CardBody Component
 * Main content area of card
 */
export const CardBody = ({ children, className = '', ...props }) => {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  );
};

/**
 * CardFooter Component
 * Footer section of card with actions
 */
export const CardFooter = ({ 
  children, 
  className = '',
  align = 'right',
  ...props 
}) => {
  const alignments = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between',
  };

  return (
    <div 
      className={cn(
        'mt-6 pt-4 border-t border-gray-200 flex items-center gap-3',
        alignments[align],
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};

// Export all components
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;