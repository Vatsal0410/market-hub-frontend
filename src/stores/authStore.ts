/**
 * Auth Store
 */
import { create } from "zustand";
import { authApi, type User } from "../api/auth";
import type { AxiosError } from "axios";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isVerified: boolean;
  isLoading: boolean;

  setAuth: (user: User | null) => void;
  logout: () => Promise<void>;
  setLoading: (loading: boolean) => void;

  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isVerified: false,
  isLoading: true,

  setAuth: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isVerified: user?.isVerified ?? false,
      isLoading: false,
    }),

  logout: async () => {
    try {
      await authApi.logout(); // send cookies
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      if (err.response?.status !== 401) {
        console.error("Logout error:", err);
      }
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        isVerified: false,
        isLoading: false,
      });
    }
  },

  setLoading: (isLoading) => set({ isLoading }),

  initializeAuth: async () => {
    set({ isLoading: true });

    try {
      const res = await authApi.getProfile();

      const user = res.data.data.user;

      set({
        user,
        isAuthenticated: !!user && user.isVerified,
        isVerified: user.isVerified ?? false,
        isLoading: false,
      });
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      if (err.response?.status === 401) {
        // console.log("No token found, user not logged in"); // optional
      } else {
        console.error("Unexpected error initializing auth:", err);
      }
      set({
        user: null,
        isAuthenticated: false,
        isVerified: false,
        isLoading: false,
      });
    }
  },
}));
