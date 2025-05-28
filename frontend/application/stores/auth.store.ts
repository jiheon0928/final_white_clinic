import { AuthState } from "@/types/stores/zustandStore.types";
import { create } from "zustand"; // ✅ 올바른 zustand import

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
