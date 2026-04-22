/**
 * Auth API
 */

import api from "../lib/api";


export interface RegisterData {
  fname: string;
  lname: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UpdateProfileData {
  fname?: string;
  lname?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface User {
  id: string;
  fname?: string;
  lname?: string;
  name?: string;
  email: string;
  role: "user" | "admin";
  isVerified?: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const authApi = {
  register: (data: RegisterData) =>
    api.post<ApiResponse<{ user: User; accessToken: string }>>(
      "/api/auth/register",
      data,
    ),
  login: (data: LoginData) =>
    api.post<ApiResponse<{ user: User }>>("/api/auth/login", data),
  verifyEmail: (otp: string) =>
    api.post<ApiResponse<{ user: User }>>("/api/auth/verify-email", { otp }),
  resendVerification: () =>
    api.post<ApiResponse<null>>("/api/auth/resend-verification"),
  getProfile: () => api.get<ApiResponse<{ user: User }>>("/api/auth/profile"),

  logout: () => api.post<ApiResponse<null>>("/api/auth/logout"),

  updateProfile: (data: UpdateProfileData) =>
    api.put<ApiResponse<{ user: User }>>("/api/auth/profile", data),

  changePassword: (data: ChangePasswordData) =>
    api.put<ApiResponse<null>>("/api/auth/password", data),

  refreshToken: (refreshToken: string) =>
    api.post<ApiResponse<{ accessToken: string }>>("/api/auth/refresh-token", {
      refreshToken,
    }),

  forgotPassword: (email: string) =>
    api.post<ApiResponse<null>>("/api/auth/forgot-password", {
      email,
    }),

  verifyOtp: (email: string, otp: string) =>
    api.post<ApiResponse<{ resetToken: string }>>("/api/auth/verify-otp", {
      email,
      otp,
    }),

  resetPassword: (newPassword: string, resetToken: string) =>
    api.post<ApiResponse<null>>("/api/auth/reset-password", {
      resetToken,
      newPassword,
    }),
};
