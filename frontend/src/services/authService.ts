import api from '@/lib/api';
import type { LoginRequest, LoginResponse, ApiResponse, RegisterRequest } from '@/types';

export const authService = {
  login: (data: LoginRequest) =>
    api.post<ApiResponse<LoginResponse>>('/auth/login', data).then((r) => r.data),

  register: (data: RegisterRequest) =>
    api.post<ApiResponse<null>>('/auth/register', data).then((r) => r.data),

  logout: (refreshToken: string) =>
    api.post<ApiResponse<null>>('/auth/logout', JSON.stringify(refreshToken)).then((r) => r.data),

  me: () =>
    api.get<ApiResponse<{ userId: number; userName: string; email: string }>>('/auth/me').then((r) => r.data),

  refreshToken: (token: string) =>
    api.post<ApiResponse<LoginResponse>>('/auth/refresh', JSON.stringify(token)).then((r) => r.data),
};
