'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, AuthResponse, LoginRequest, RegisterRequest } from '@/services/api/auth.service';

interface AuthContextType {
  user: AuthResponse | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<AuthResponse>;
  register: (data: RegisterRequest) => Promise<AuthResponse>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('aiprogen_token');
    const storedRefreshToken = localStorage.getItem('aiprogen_refresh_token');

    if (storedToken) {
      setToken(storedToken);
      authService
        .getMe()
        .then((userData) => {
          setUser(userData);
        })
        .catch(async () => {
          // Access token expired, attempt automatic refresh token rotation
          if (storedRefreshToken) {
            try {
              const res = await authService.refreshToken(storedRefreshToken);
              handleAuthSuccess(res);
            } catch {
              logout();
            }
          } else {
            logout();
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleAuthSuccess = (res: AuthResponse) => {
    const activeToken = res.accessToken || res.token;
    if (activeToken) {
      localStorage.setItem('aiprogen_token', activeToken);
      setToken(activeToken);
    }
    if (res.refreshToken) {
      localStorage.setItem('aiprogen_refresh_token', res.refreshToken);
    }
    setUser(res);
    return res;
  };

  const login = async (data: LoginRequest): Promise<AuthResponse> => {
    const res = await authService.login(data);
    return handleAuthSuccess(res);
  };

  const register = async (data: RegisterRequest): Promise<AuthResponse> => {
    const res = await authService.register(data);
    return handleAuthSuccess(res);
  };

  const logout = () => {
    const storedRefreshToken = localStorage.getItem('aiprogen_refresh_token');
    if (storedRefreshToken) {
      authService.logout(storedRefreshToken).catch(() => {});
    }
    localStorage.removeItem('aiprogen_token');
    localStorage.removeItem('aiprogen_refresh_token');
    setToken(null);
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const userData = await authService.getMe();
      setUser(userData);
    } catch {
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
      login: async () => { throw new Error('AuthContext not initialized'); },
      register: async () => { throw new Error('AuthContext not initialized'); },
      logout: () => {},
      refreshUser: async () => {},
    };
  }
  return context;
};
