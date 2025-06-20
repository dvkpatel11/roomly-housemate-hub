
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  isEmailVerified: boolean;
  onboardingCompleted: boolean;
  householdId?: string;
  createdAt: Date;
}

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

export interface ResetPasswordCredentials {
  email: string;
}

export interface OnboardingProfile {
  name: string;
  avatar?: File;
  preferences: {
    notifications: boolean;
    theme: 'light' | 'dark' | 'system';
    language: string;
  };
}

export interface HouseholdSetup {
  action: 'join' | 'create';
  householdName?: string;
  inviteCode?: string;
}

export type AuthError = {
  message: string;
  field?: string;
};
