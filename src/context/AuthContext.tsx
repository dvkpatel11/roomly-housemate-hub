
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

  // Mock authentication functions - replace with actual API calls
  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
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
        return { success: true };
      }
      
      return { success: false, error: { message: 'Invalid email or password' } };
    } catch (error) {
      return { success: false, error: { message: 'An error occurred during login' } };
    }
  };

  const signup = async (credentials: SignupCredentials) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Simulate API call
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

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('auth_user');
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
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        dispatch({ type: 'SET_USER', payload: user });
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('auth_user');
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

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
