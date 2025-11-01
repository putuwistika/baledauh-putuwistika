/**
 * 🎊 RuangTamu - Wedding Check-in System
 * Helper Functions & Utilities (COMPLETE & FIXED!)
 * by PutuWistika
 */

import { format, formatDistanceToNow, parseISO, isValid } from 'date-fns';
import { STORAGE_KEYS, VALIDATION, DATE_FORMATS } from './constants';

// ============================================
// Date & Time Helpers
// ============================================

/**
 * Format date string menjadi readable format
 * @param {string|Date} date - Date to format
 * @param {string} formatStr - Format string (default: 'PPpp')
 * @returns {string} Formatted date
 */
export const formatDate = (date, formatStr = DATE_FORMATS.FULL) => {
  if (!date) return '-';
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '-';
    return format(dateObj, formatStr);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '-';
  }
};

/**
 * Format date time dengan format lengkap (NEW!)
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date time
 */
export const formatDateTime = (date) => {
  if (!date) return '-';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return '-';
    
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return dateObj.toLocaleString('id-ID', options);
  } catch (error) {
    console.error('Error formatting date time:', error);
    return '-';
  }
};

/**
 * Format time ago (relative time) (NEW!)
 * @param {string|Date} date - Date to format
 * @returns {string} Time ago string
 */
export const formatTimeAgo = (date) => {
  if (!date) return '-';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return '-';
    
    const seconds = Math.floor((new Date() - dateObj) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' tahun lalu';
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' bulan lalu';
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' hari lalu';
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' jam lalu';
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' menit lalu';
    
    return Math.floor(seconds) + ' detik lalu';
  } catch (error) {
    console.error('Error formatting time ago:', error);
    return '-';
  }
};

/**
 * Format date menjadi relative time (e.g., "5 minutes ago")
 * @param {string|Date} date - Date to format
 * @returns {string} Relative time
 */
export const formatRelativeTime = (date) => {
  if (!date) return '-';
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '-';
    return formatDistanceToNow(dateObj, { addSuffix: true });
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return '-';
  }
};

/**
 * Get current timestamp in ISO format
 * @returns {string} ISO timestamp
 */
export const getCurrentTimestamp = () => {
  return new Date().toISOString();
};

/**
 * Format time only (HH:mm)
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted time
 */
export const formatTime = (date) => {
  return formatDate(date, DATE_FORMATS.TIME_ONLY);
};

/**
 * Format date only (no time)
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date
 */
export const formatDateOnly = (date) => {
  return formatDate(date, DATE_FORMATS.DATE_ONLY);
};

// ============================================
// Currency Helpers
// ============================================

/**
 * Format number menjadi Rupiah currency
 * @param {number|string} amount - Amount to format
 * @returns {string} Formatted currency (e.g., "Rp 500.000")
 */
export const formatCurrency = (amount) => {
  if (!amount || amount === 0) return 'Rp 0';
  
  const num = typeof amount === 'string' ? parseFloat(amount.replace(/[^0-9.-]+/g, '')) : amount;
  
  if (isNaN(num)) return 'Rp 0';
  
  return `Rp ${num.toLocaleString('id-ID')}`;
};

/**
 * Parse currency string menjadi number
 * @param {string} currencyStr - Currency string (e.g., "Rp 500.000")
 * @returns {number} Parsed number
 */
export const parseCurrency = (currencyStr) => {
  if (!currencyStr) return 0;
  return parseFloat(currencyStr.replace(/[^0-9.-]+/g, '')) || 0;
};

// ============================================
// LocalStorage Helpers
// ============================================

/**
 * Save data to localStorage
 * @param {string} key - Storage key
 * @param {any} value - Value to store
 */
export const setStorage = (key, value) => {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

/**
 * Get data from localStorage
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value if not found
 * @returns {any} Retrieved value or default
 */
export const getStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 */
export const removeStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

/**
 * Clear all app-related localStorage
 */
export const clearStorage = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

/**
 * Save user data to localStorage
 * @param {object} user - User object
 */
export const saveUser = (user) => {
  setStorage(STORAGE_KEYS.USER, user);
};

/**
 * Get user data from localStorage
 * @returns {object|null} User object or null
 */
export const getUser = () => {
  return getStorage(STORAGE_KEYS.USER);
};

/**
 * Save auth token to localStorage
 * @param {string} token - Auth token
 */
export const saveToken = (token) => {
  setStorage(STORAGE_KEYS.TOKEN, token);
};

/**
 * Get auth token from localStorage
 * @returns {string|null} Auth token or null
 */
export const getToken = () => {
  return getStorage(STORAGE_KEYS.TOKEN);
};

/**
 * Remove user and token from localStorage
 */
export const logout = () => {
  removeStorage(STORAGE_KEYS.USER);
  removeStorage(STORAGE_KEYS.TOKEN);
  removeStorage(STORAGE_KEYS.LAST_LOGIN);
};

// ============================================
// String Helpers
// ============================================

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Capitalize first letter of each word
 * @param {string} str - String to capitalize
 * @returns {string} Title cased string
 */
export const titleCase = (str) => {
  if (!str) return '';
  return str
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
};

/**
 * Truncate string with ellipsis
 * @param {string} str - String to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated string
 */
export const truncate = (str, maxLength = 50) => {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  return `${str.substring(0, maxLength)}...`;
};

/**
 * Generate initials from name
 * @param {string} name - Full name
 * @returns {string} Initials (e.g., "John Doe" -> "JD")
 */
export const getInitials = (name) => {
  if (!name) return '?';
  
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

/**
 * Generate random string
 * @param {number} length - Length of string
 * @returns {string} Random string
 */
export const generateRandomString = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Generate guest UID
 * @param {string} prefix - Prefix for UID (default: 'g')
 * @returns {string} Generated UID (e.g., "g_abc123")
 */
export const generateGuestUID = (prefix = 'g') => {
  const timestamp = Date.now().toString(36);
  const random = generateRandomString(4).toLowerCase();
  return `${prefix}_${timestamp}_${random}`;
};

// ============================================
// Validation Helpers
// ============================================

/**
 * Validate email
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  return VALIDATION.EMAIL.PATTERN.test(email);
};

/**
 * Validate password
 * @param {string} password - Password to validate
 * @returns {boolean} True if valid
 */
export const isValidPassword = (password) => {
  if (!password) return false;
  return password.length >= VALIDATION.PASSWORD.MIN_LENGTH;
};

/**
 * Validate name
 * @param {string} name - Name to validate
 * @returns {boolean} True if valid
 */
export const isValidName = (name) => {
  if (!name) return false;
  const length = name.trim().length;
  return length >= VALIDATION.NAME.MIN_LENGTH && length <= VALIDATION.NAME.MAX_LENGTH;
};

/**
 * Validate Indonesian phone number (NEW!)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} Is valid
 */
export const isValidPhone = (phone) => {
  if (!phone) return false;
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Indonesian phone format: 08xx-xxxx-xxxx (10-13 digits)
  // or international format: +628xx-xxxx-xxxx
  if (cleaned.startsWith('62')) {
    return cleaned.length >= 11 && cleaned.length <= 14;
  }
  
  return cleaned.length >= 10 && cleaned.length <= 13 && cleaned.startsWith('0');
};

/**
 * Validate UID
 * @param {string} uid - UID to validate
 * @returns {boolean} True if valid
 */
export const isValidUID = (uid) => {
  if (!uid) return false;
  return VALIDATION.UID.PATTERN.test(uid);
};

/**
 * Validate required fields in object
 * @param {object} obj - Object to validate
 * @param {array} requiredFields - Array of required field names
 * @returns {object} { valid: boolean, missing: array }
 */
export const validateRequiredFields = (obj, requiredFields) => {
  const missing = requiredFields.filter(field => !obj[field]);
  return {
    valid: missing.length === 0,
    missing,
  };
};

// ============================================
// Guest Helpers
// ============================================

/**
 * Check if guest is checked in
 * @param {object} guest - Guest object
 * @returns {boolean} True if checked in
 */
export const isGuestCheckedIn = (guest) => {
  return guest?.is_checked_in === true;
};

/**
 * Check if guest is in queue
 * @param {object} guest - Guest object
 * @returns {boolean} True if in queue
 */
export const isGuestInQueue = (guest) => {
  return guest?.check_in_status === 'queue';
};

/**
 * Check if guest is completed
 * @param {object} guest - Guest object
 * @returns {boolean} True if completed
 */
export const isGuestCompleted = (guest) => {
  return guest?.check_in_status === 'done';
};

/**
 * Get guest display name with table
 * @param {object} guest - Guest object
 * @returns {string} Display name (e.g., "John Doe (Table A1)")
 */
export const getGuestDisplayName = (guest) => {
  if (!guest) return '-';
  
  const name = guest.name || 'Unknown Guest';
  const table = guest.table_number;
  
  if (table) {
    return `${name} (Table ${table})`;
  }
  
  return name;
};

/**
 * Count total companions
 * @param {array} guests - Array of guest objects
 * @returns {number} Total companions
 */
export const countTotalCompanions = (guests) => {
  if (!Array.isArray(guests)) return 0;
  return guests.reduce((sum, guest) => sum + (guest.companion_count || 0), 0);
};

// ============================================
// Permission Helpers
// ============================================

/**
 * Check if user has permission
 * @param {object} user - User object
 * @param {string} permission - Permission to check
 * @returns {boolean} True if has permission
 */
export const hasPermission = (user, permission) => {
  if (!user || !user.role) return false;
  
  // Import dynamically to avoid circular dependency
  const { PERMISSIONS } = require('./constants');
  const rolePermissions = PERMISSIONS?.[user.role] || [];
  
  return rolePermissions.includes(permission);
};

/**
 * Check if user is admin
 * @param {object} user - User object
 * @returns {boolean} True if admin
 */
export const isAdmin = (user) => {
  return user?.role === 'admin';
};

/**
 * Check if user is runner
 * @param {object} user - User object
 * @returns {boolean} True if runner
 */
export const isRunner = (user) => {
  return user?.role === 'runner';
};

// ============================================
// Error Helpers
// ============================================

/**
 * Extract error message from error object
 * @param {Error|object} error - Error object
 * @returns {string} Error message
 */
export const getErrorMessage = (error) => {
  if (!error) return 'An unknown error occurred';
  
  // Check API error response
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  // Check error message
  if (error.message) {
    return error.message;
  }
  
  // Check string error
  if (typeof error === 'string') {
    return error;
  }
  
  return 'An unknown error occurred';
};

/**
 * Check if error is network error
 * @param {Error} error - Error object
 * @returns {boolean} True if network error
 */
export const isNetworkError = (error) => {
  return error?.message === 'Network Error' || !navigator.onLine;
};

// ============================================
// Array Helpers
// ============================================

/**
 * Sort array by date field
 * @param {array} arr - Array to sort
 * @param {string} dateField - Field name containing date
 * @param {string} order - 'asc' or 'desc' (default: 'desc')
 * @returns {array} Sorted array
 */
export const sortByDate = (arr, dateField, order = 'desc') => {
  if (!Array.isArray(arr)) return [];
  
  return [...arr].sort((a, b) => {
    const dateA = new Date(a[dateField]);
    const dateB = new Date(b[dateField]);
    
    if (order === 'asc') {
      return dateA - dateB;
    }
    return dateB - dateA;
  });
};

/**
 * Group array by field
 * @param {array} arr - Array to group
 * @param {string} field - Field name to group by
 * @returns {object} Grouped object
 */
export const groupBy = (arr, field) => {
  if (!Array.isArray(arr)) return {};
  
  return arr.reduce((acc, item) => {
    const key = item[field] || 'unknown';
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
};

/**
 * Filter array by search query
 * @param {array} arr - Array to filter
 * @param {string} query - Search query
 * @param {array} fields - Fields to search in
 * @returns {array} Filtered array
 */
export const searchFilter = (arr, query, fields) => {
  if (!Array.isArray(arr) || !query) return arr;
  
  const lowerQuery = query.toLowerCase().trim();
  
  return arr.filter(item => {
    return fields.some(field => {
      const value = item[field];
      if (!value) return false;
      return value.toString().toLowerCase().includes(lowerQuery);
    });
  });
};

// ============================================
// Number Helpers
// ============================================

/**
 * Format number with thousand separator
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatNumber = (num) => {
  if (num === undefined || num === null) return '0';
  return num.toLocaleString('id-ID');
};

/**
 * Calculate percentage
 * @param {number} value - Current value
 * @param {number} total - Total value
 * @returns {number} Percentage (0-100)
 */
export const calculatePercentage = (value, total) => {
  if (!total || total === 0) return 0;
  return Math.round((value / total) * 100);
};

// ============================================
// Debounce Helper
// ============================================

/**
 * Debounce function to limit execution rate
 * @param {function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// ============================================
// Copy to Clipboard
// ============================================

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} True if successful
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return false;
  }
};

// ============================================
// UI/Style Helper Functions (NEW!)
// ============================================

/**
 * Conditional className utility (cn) (NEW!)
 * Combines class names conditionally
 * @param {...any} classes - Class names to combine
 * @returns {string} Combined class names
 * 
 * @example
 * cn('btn', isActive && 'btn-active', 'btn-primary')
 * // Returns: "btn btn-active btn-primary"
 */
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Generate random color (for avatars, etc) (NEW!)
 * @returns {string} Random color class
 */
export const getRandomColor = () => {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * Get color based on status (NEW!)
 * @param {string} status - Guest status
 * @returns {string} Color class
 */
export const getStatusColor = (status) => {
  const colorMap = {
    not_arrived: 'gray',
    queue: 'yellow',
    done: 'green',
    waiting: 'blue',
    completed: 'green',
  };
  return colorMap[status] || 'gray';
};

/**
 * Clamp number between min and max (NEW!)
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 */
export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

// ============================================
// Export all helpers
// ============================================

export default {
  // Date & Time
  formatDate,
  formatDateTime,
  formatTimeAgo,
  formatRelativeTime,
  getCurrentTimestamp,
  formatTime,
  formatDateOnly,
  
  // Currency
  formatCurrency,
  parseCurrency,
  
  // LocalStorage
  setStorage,
  getStorage,
  removeStorage,
  clearStorage,
  saveUser,
  getUser,
  saveToken,
  getToken,
  logout,
  
  // String
  capitalize,
  titleCase,
  truncate,
  getInitials,
  generateRandomString,
  generateGuestUID,
  
  // Validation
  isValidEmail,
  isValidPassword,
  isValidName,
  isValidPhone,
  isValidUID,
  validateRequiredFields,
  
  // Guest
  isGuestCheckedIn,
  isGuestInQueue,
  isGuestCompleted,
  getGuestDisplayName,
  countTotalCompanions,
  
  // Permission
  hasPermission,
  isAdmin,
  isRunner,
  
  // Error
  getErrorMessage,
  isNetworkError,
  
  // Array
  sortByDate,
  groupBy,
  searchFilter,
  
  // Number
  formatNumber,
  calculatePercentage,
  
  // Utils
  debounce,
  copyToClipboard,
  
  // UI/Style
  cn,
  getRandomColor,
  getStatusColor,
  clamp,
};