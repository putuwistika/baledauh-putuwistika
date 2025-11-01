/**
 * 🎊 RuangTamu - Wedding Check-in System
 * API Service Layer (FIXED FOR ALL RESPONSE FORMATS!)
 * by PutuWistika
 */

import axios from 'axios';

// ============================================
// CONFIGURATION
// ============================================

const BASE_URL = 'https://n8n.srv1095171.hstgr.cloud';

console.log('🔧 API Configuration:', {
  baseURL: BASE_URL,
});

// ============================================
// Create Axios Instance
// ============================================

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============================================
// Request Interceptor
// ============================================

api.interceptors.request.use(
  (config) => {
    console.log('📤 API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      fullURL: `${config.baseURL}${config.url}`,
    });

    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// ============================================
// Response Interceptor (UNIVERSAL FIX!)
// ============================================

api.interceptors.response.use(
  (response) => {
    console.log('📥 Raw API Response:', response.data);
    
    let data = response.data;
    
    // Handle array response (e.g., login returns [{...}])
    if (Array.isArray(data) && data.length > 0) {
      console.log('🔄 Array response detected, extracting first element');
      data = data[0];
    }
    
    console.log('✅ Processed Response:', data);
    return data;
  },
  (error) => {
    console.error('❌ API Response Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      return Promise.reject(new Error('Unable to connect to server'));
    }

    const message = error.response?.data?.message || error.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);

// ============================================
// AUTH ENDPOINTS
// ============================================

export const login = async (email, password) => {
  try {
    const response = await api.post('/webhook/auth/login', { email, password });
    return response;
  } catch (error) {
    throw error;
  }
};

// ============================================
// GUEST ENDPOINTS
// ============================================

export const getAllGuests = async () => {
  try {
    const response = await api.get('/webhook/get-guests');
    
    // ✅ Extract guests array if exists
    if (response.guests) {
      return {
        success: response.success,
        data: response.guests,
        total: response.total || response.guests.length,
      };
    }
    
    return response;
  } catch (error) {
    throw error;
  }
};

export const getGuestByUID = async (uid) => {
  try {
    const response = await api.get(`/webhook/1d3229bc-af4b-4a6b-bef1-b16b8760a05f/get-guest/${uid}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const searchGuests = async (query) => {
  try {
    const response = await api.post('/webhook/search-guests', { query });
    
    console.log('🔍 Search response:', response);
    
    // ✅ Extract guests array if exists
    if (response.guests) {
      return {
        success: response.success,
        data: response.guests,
        total: response.total || response.guests.length,
      };
    }
    
    return response;
  } catch (error) {
    throw error;
  }
};

export const createGuest = async (guestData) => {
  try {
    const response = await api.post('/webhook/create-guest', guestData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const checkInGuest = async (uid, checkInData) => {
  try {
    const response = await api.post('/webhook/check-in-guest', {
      uid,
      ...checkInData,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const takeGuest = async (uid, takeData) => {
  try {
    const response = await api.post('/webhook/take-guest', {
      uid,
      ...takeData,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// ============================================
// QUEUE ENDPOINTS
// ============================================

export const getQueue = async () => {
  try {
    const response = await api.get('/webhook/get-queue');
    
    console.log('📋 Queue response:', response);
    
    // ✅ Extract guests/queue array if exists
    if (response.guests) {
      return {
        success: response.success,
        data: response.guests,
        total: response.total || response.guests.length,
      };
    }
    
    if (response.queue) {
      return {
        success: response.success,
        data: response.queue,
        total: response.total || response.queue.length,
      };
    }
    
    return response;
  } catch (error) {
    throw error;
  }
};

// Alias for backward compatibility
export const getQueueList = getQueue;

export const getRunnerCompleted = async (runnerId) => {
  try {
    const response = await api.get(`/webhook/99572f92-6c4f-486b-b4e4-dd5df671e866/runner-completed/${runnerId}`);
    
    // ✅ Extract guests array if exists
    if (response.guests) {
      return {
        success: response.success,
        data: response.guests,
        total: response.total || response.guests.length,
      };
    }
    
    return response;
  } catch (error) {
    throw error;
  }
};

export default api;