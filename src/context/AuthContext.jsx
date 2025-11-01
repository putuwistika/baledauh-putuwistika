/**
 * 🎊 RuangTamu - Wedding Check-in System
 * Authentication Context (FULL VERSION WITH DEBUG)
 * by PutuWistika
 */

import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { login as apiLogin } from '../services/api.js';
import {
  saveUser,
  saveToken,
  getUser,
  getToken,
  logout as clearAuth,
} from '../utils/helpers';
import {
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  ROUTES,
  USER_ROLES,
} from '../utils/constants';

// ============================================
// Create Context
// ============================================

export const AuthContext = createContext(null);

// ============================================
// Auth Provider Component
// ============================================

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ============================================
  // Initialize Auth State from LocalStorage
  // ============================================

  useEffect(() => {
    const initializeAuth = () => {
      try {
        console.log('🔄 Initializing auth from localStorage...');
        
        const storedUser = getUser();
        const storedToken = getToken();

        console.log('📦 Stored user:', storedUser);
        console.log('🔑 Stored token:', storedToken ? 'EXISTS' : 'MISSING');

        if (storedUser && storedToken) {
          setUser(storedUser);
          setToken(storedToken);
          setIsAuthenticated(true);
          console.log('✅ Auth restored from localStorage');
        } else {
          console.log('ℹ️ No stored auth found');
        }
      } catch (error) {
        console.error('❌ Error initializing auth:', error);
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // ============================================
  // Login Function
  // ============================================

  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);

      console.log('🔐 Step 1: Starting login...', { email });

      const response = await apiLogin(email, password);

      console.log('📥 Step 2: API Response:', response);
      console.log('📊 Response structure:', {
        success: response?.success,
        hasData: !!response?.data,
        dataKeys: response?.data ? Object.keys(response.data) : [],
      });

      if (!response || !response.success) {
        console.error('❌ Step 3: Login failed - success is false or undefined');
        throw new Error(response?.message || ERROR_MESSAGES.LOGIN_FAILED);
      }

      console.log('✅ Step 3: Success flag is true');

      const { user: userData, token: authToken } = response.data;

      console.log('👤 Step 4: User data:', userData);
      console.log('🔑 Step 5: Token:', authToken ? 'EXISTS' : 'MISSING');

      if (!userData || !authToken) {
        console.error('❌ Missing user data or token');
        throw new Error('Invalid response: missing user data or token');
      }

      // Save to state
      setUser(userData);
      setToken(authToken);
      setIsAuthenticated(true);

      console.log('💾 Step 6: Saved to state');

      // Save to localStorage
      saveUser(userData);
      saveToken(authToken);

      console.log('💾 Step 7: Saved to localStorage');

      // Show success message
      toast.success(SUCCESS_MESSAGES.LOGIN || 'Login successful!');

      console.log('🔔 Step 8: Toast shown');

      // Redirect based on role
      const redirectPath = userData.role === USER_ROLES.ADMIN
        ? ROUTES.ADMIN_DASHBOARD
        : ROUTES.RUNNER_DASHBOARD;

      console.log('🚀 Step 9: Redirecting to:', redirectPath);
      console.log('📍 Available routes:', ROUTES);
      console.log('👥 User role:', userData.role);
      console.log('🎯 USER_ROLES constant:', USER_ROLES);
      console.log('🔍 Role comparison:', {
        userRole: userData.role,
        adminRole: USER_ROLES.ADMIN,
        isAdmin: userData.role === USER_ROLES.ADMIN,
      });
      
      // Use setTimeout to ensure state is updated before navigation
      setTimeout(() => {
        console.log('⏰ Executing navigate...');
        navigate(redirectPath, { replace: true });
        console.log('✅ Step 10: Navigate called');
      }, 100);

      return { success: true };
    } catch (error) {
      console.error('❌ Login error:', error);
      console.error('❌ Error message:', error.message);
      console.error('❌ Error stack:', error.stack);
      
      toast.error(error.message || ERROR_MESSAGES.LOGIN_FAILED || 'Login failed');
      
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
      console.log('🏁 Step 11: Loading set to false');
    }
  }, [navigate]);

  // ============================================
  // Logout Function
  // ============================================

  const logout = useCallback(() => {
    try {
      console.log('🚪 Logging out...');
      
      // Clear state
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);

      // Clear localStorage
      clearAuth();

      // Show success message
      toast.success(SUCCESS_MESSAGES.LOGOUT || 'Logged out successfully');

      console.log('✅ Logout successful');

      // Redirect to home
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error('❌ Logout error:', error);
      toast.error('Error during logout');
    }
  }, [navigate]);

  // ============================================
  // Update User Function
  // ============================================

  const updateUser = useCallback((updatedData) => {
    try {
      const updatedUser = { ...user, ...updatedData };
      setUser(updatedUser);
      saveUser(updatedUser);
      console.log('✅ User updated:', updatedUser);
    } catch (error) {
      console.error('❌ Error updating user:', error);
    }
  }, [user]);

  // ============================================
  // Check if User is Admin
  // ============================================

  const isAdmin = useCallback(() => {
    return user?.role === USER_ROLES.ADMIN;
  }, [user]);

  // ============================================
  // Check if User is Runner
  // ============================================

  const isRunner = useCallback(() => {
    return user?.role === USER_ROLES.RUNNER;
  }, [user]);

  // ============================================
  // Get User Role
  // ============================================

  const getUserRole = useCallback(() => {
    return user?.role || null;
  }, [user]);

  // ============================================
  // Context Value
  // ============================================

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    logout,
    updateUser,
    isAdmin,
    isRunner,
    getUserRole,
  };

  // ============================================
  // Debug Log on State Changes
  // ============================================

  useEffect(() => {
    console.log('🔄 Auth state changed:', {
      isAuthenticated,
      hasUser: !!user,
      hasToken: !!token,
      userRole: user?.role,
      loading,
    });
  }, [isAuthenticated, user, token, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;