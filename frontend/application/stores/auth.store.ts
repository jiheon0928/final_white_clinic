import { create } from "zustand"; // ✅ 올바른 zustand import

type AuthState = {
  isAuthenticated: boolean; // ✅ 철자 수정
  name: string;
  accessToken?: string;
  setAuth: (name: string, accessToken: string) => void;
  setAuthOff: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  name: "",
  accessToken: "",

  setAuth: (name: string, accessToken: string) => {
    set({
      isAuthenticated: true,
      name,
      accessToken,
    });
  },

  setAuthOff: () => {
    set({
      isAuthenticated: false, // ✅ 철자 일치
      name: "",
      accessToken: "",
    });
  },
}));
