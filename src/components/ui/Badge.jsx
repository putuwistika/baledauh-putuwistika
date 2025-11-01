/**
 * 🎊 RuangTamu - Wedding Check-in System
 * Badge Component - Status indicators
 * by PutuWistika
 */

import React from 'react';
import { cn } from '@utils/helpers';
import { GUEST_STATUS } from '@utils/constants';

/**
 * Badge Component
 * Display status badges with different variants
 */
const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  icon: Icon,
  className = '',
  dot = false,
  ...props
}) => {
  // Variant styles
  const variants = {
    default: 'bg-gray-100 text-gray-800 border-gray-300',
    primary: 'bg-blue-100 text-blue-800 border-blue-300',
    success: 'bg-green-100 text-green-800 border-green-300',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    error: 'bg-red-100 text-red-800 border-red-300',
    info: 'bg-blue-100 text-blue-800 border-blue-300',
    purple: 'bg-purple-100 text-purple-800 border-purple-300',
    pink: 'bg-pink-100 text-pink-800 border-pink-300',
  };

  // Size styles
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  // Dot styles per variant
  const dotColors = {
    default: 'bg-gray-500',
    primary: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    purple: 'bg-purple-500',
    pink: 'bg-pink-500',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium border',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full',
            dotColors[variant]
          )}
        />
      )}
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
    </span>
  );
};

/**
 * Status Badge Component
 * Pre-configured badge for guest status
 */
export const StatusBadge = ({ status, ...props }) => {
  const statusConfig = {
    [GUEST_STATUS.NOT_ARRIVED]: {
      variant: 'default',
      label: 'Not Arrived',
      dot: true,
    },
    [GUEST_STATUS.QUEUE]: {
      variant: 'warning',
      label: 'In Queue',
      dot: true,
    },
    [GUEST_STATUS.DONE]: {
      variant: 'success',
      label: 'Completed',
      dot: false,
    },
  };

  const config = statusConfig[status] || statusConfig[GUEST_STATUS.NOT_ARRIVED];

  return (
    <Badge
      variant={config.variant}
      dot={config.dot}
      {...props}
    >
      {config.label}
    </Badge>
  );
};

/**
 * Priority Badge Component
 * For VIP or priority guests
 */
export const PriorityBadge = ({ priority = false, ...props }) => {
  if (!priority) return null;

  return (
    <Badge variant="error" size="sm" {...props}>
      VIP
    </Badge>
  );
};

/**
 * Count Badge Component
 * For displaying counts (e.g., notification badge)
 */
export const CountBadge = ({ count, max = 99, ...props }) => {
  const displayCount = count > max ? `${max}+` : count;

  if (!count || count === 0) return null;

  return (
    <Badge
      variant="error"
      size="sm"
      className="min-w-[20px] justify-center"
      {...props}
    >
      {displayCount}
    </Badge>
  );
};

// Export all components
Badge.Status = StatusBadge;
Badge.Priority = PriorityBadge;
Badge.Count = CountBadge;

export default Badge;