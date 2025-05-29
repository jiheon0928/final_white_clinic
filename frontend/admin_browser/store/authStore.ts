import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

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
