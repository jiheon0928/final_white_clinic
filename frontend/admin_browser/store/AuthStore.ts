import { create } from "zustand";
import api from "@/utils/api/api";

type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
};

// 로그인
export const loginRequest = async (loginId: string, password: string) => {
  const response = await api.post(`/auth/login`, {
    loginId,
    password,
  });
  return response.data;
};


export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  token: null,
  login: (token: string) => {
    localStorage.setItem("adminToken", token);
    set({ isAuthenticated: true, token });
  },
  logout: () => {
    localStorage.removeItem("adminToken");
    set({ isAuthenticated: false, token: null });
  },
}));
