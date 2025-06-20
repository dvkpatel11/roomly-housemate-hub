import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AuthState, AuthUser, LoginCredentials, SignupCredentials, ResetPasswordCredentials, AuthError } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: AuthError }>;
  signup: (credentials: SignupCredentials) => Promise<{ success: boolean; error?: AuthError }>;
  logout: () => void;
  resetPassword: (credentials: ResetPasswordCredentials) => Promise<{ success: boolean; error?: AuthError }>;
  verifyEmail: (token: string) => Promise<{ success: boolean; error?: AuthError }>;
  updateUser: (updates: Partial<AuthUser>) => void;
  resendVerification: () => Promise<{ success: boolean; error?: AuthError }>;
}

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: AuthUser | null }
  | { type: 'UPDATE_USER'; payload: Partial<AuthUser> }
  | { type: 'LOGOUT' };

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Check if we're in development mode
      const isDevelopment = import.meta.env.DEV;
      
      if (isDevelopment) {
        // Mock validation for development
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (credentials.email === 'test@example.com' && credentials.password === 'password') {
          const mockUser: AuthUser = {
            id: '1',
            email: credentials.email,
            name: 'Test User',
            isEmailVerified: true,
            onboardingCompleted: true,
            householdId: '1',
            createdAt: new Date(),
          };
          
          dispatch({ type: 'SET_USER', payload: mockUser });
          localStorage.setItem('auth_user', JSON.stringify(mockUser));
          localStorage.setItem('auth_token', 'mock_token_123');
          console.log('Login successful, user set:', mockUser);
          return { success: true };
        }
        
        dispatch({ type: 'SET_LOADING', payload: false });
        return { success: false, error: { message: 'Invalid email or password' } };
      } else {
        // Production API call
        const { apiService } = await import('@/services/api');
        const response = await apiService.login(credentials.email, credentials.password);
        
        if (response.success && response.data.user) {
          const user: AuthUser = {
            id: response.data.user.id,
            email: response.data.user.email,
            name: response.data.user.name,
            avatar: response.data.user.avatar,
            isEmailVerified: true, // Assuming verified if they can login
            onboardingCompleted: true, // Assuming completed if they can login
            householdId: response.data.user.householdId, // Use camelCase property
            createdAt: new Date(response.data.user.createdAt), // Use camelCase property
          };
          
          dispatch({ type: 'SET_USER', payload: user });
          localStorage.setItem('auth_user', JSON.stringify(user));
          return { success: true };
        }
        
        return { success: false, error: { message: 'Invalid email or password' } };
      }
    } catch (error: any) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: false, error: { message: error.message || 'An error occurred during login' } };
    }
  };

  const signup = async (credentials: SignupCredentials) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Simulate API call for now - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (credentials.password !== credentials.confirmPassword) {
        dispatch({ type: 'SET_LOADING', payload: false });
        return { success: false, error: { message: 'Passwords do not match', field: 'confirmPassword' } };
      }
      
      const mockUser: AuthUser = {
        id: '1',
        email: credentials.email,
        name: credentials.name,
        isEmailVerified: false,
        onboardingCompleted: false,
        createdAt: new Date(),
      };
      
      dispatch({ type: 'SET_USER', payload: mockUser });
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: false, error: { message: 'An error occurred during signup' } };
    }
  };

  const logout = async () => {
    try {
      // Try to call API logout if not in development
      if (!import.meta.env.DEV) {
        const { apiService } = await import('@/services/api');
        await apiService.logout();
      }
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      dispatch({ type: 'LOGOUT' });
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_token');
    }
  };

  const resetPassword = async (credentials: ResetPasswordCredentials) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    } catch (error) {
      return { success: false, error: { message: 'An error occurred during password reset' } };
    }
  };

  const verifyEmail = async (token: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (state.user) {
        dispatch({ type: 'UPDATE_USER', payload: { isEmailVerified: true } });
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, error: { message: 'Invalid verification token' } };
    }
  };

  const updateUser = (updates: Partial<AuthUser>) => {
    dispatch({ type: 'UPDATE_USER', payload: updates });
    
    if (state.user) {
      const updatedUser = { ...state.user, ...updates };
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    }
  };

  const resendVerification = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    } catch (error) {
      return { success: false, error: { message: 'Failed to resend verification email' } };
    }
  };

  // Load user from localStorage on mount
  useEffect(() => {
    const initializeAuth = () => {
      console.log('Initializing auth state...');
      const storedUser = localStorage.getItem('auth_user');
      const storedToken = localStorage.getItem('auth_token');
      
      if (storedUser && storedToken) {
        try {
          const user = JSON.parse(storedUser);
          console.log('Found stored user, setting authenticated state:', user);
          dispatch({ type: 'SET_USER', payload: user });
        } catch (error) {
          console.error('Failed to parse stored user:', error);
          localStorage.removeItem('auth_user');
          localStorage.removeItem('auth_token');
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } else {
        console.log('No stored user found, setting loading to false');
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initializeAuth();
  }, []);

  // Debug logging for state changes
  useEffect(() => {
    console.log('Auth state changed:', { 
      isAuthenticated: state.isAuthenticated, 
      isLoading: state.isLoading, 
      user: state.user 
    });
  }, [state.isAuthenticated, state.isLoading, state.user]);

  const contextValue: AuthContextType = {
    ...state,
    login,
    signup,
    logout,
    resetPassword,
    verifyEmail,
    updateUser,
    resendVerification,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
