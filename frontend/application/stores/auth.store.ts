import { AuthState } from "@/types/stores/zustandStore.types";
import { create } from "zustand";

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: {
    id: 0,
    name: "",
    accessToken: "",
  },

  setAuth: (name: string, accessToken: string, id: number) => {
    set((state) => ({
      ...state,
      isAuthenticated: true,
      user: {
        name,
        accessToken,
        id,
      },
    }));
  },

  setAuthOff: () => {
    set((state) => ({
      ...state,
      isAuthenticated: false,
      user: {
        name: "",
        accessToken: "",
        id: 0,
      },
    }));
  },
}));
