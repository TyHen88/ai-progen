import { apiFetch, ApiResponse } from './client';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token?: string;
  accessToken: string;
  refreshToken: string;
  tokenType?: string;
  expiresIn?: number;
  id: string;
  email: string;
  fullName: string;
  role: string;
  credits: number;
}

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const res = await apiFetch<ApiResponse<AuthResponse>>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res.data;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const res = await apiFetch<ApiResponse<AuthResponse>>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res.data;
  },

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const res = await apiFetch<ApiResponse<AuthResponse>>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
    return res.data;
  },

  async logout(refreshToken?: string): Promise<void> {
    await apiFetch<ApiResponse<void>>('/auth/logout', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  },

  async logoutAll(): Promise<void> {
    await apiFetch<ApiResponse<void>>('/auth/logout-all', {
      method: 'POST',
    });
  },

  async getMe(): Promise<AuthResponse> {
    const res = await apiFetch<ApiResponse<AuthResponse>>('/auth/me', {
      method: 'GET',
    });
    return res.data;
  },
};
