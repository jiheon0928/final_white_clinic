import { create } from "zustand";
import { useAuthStore } from "./AuthStore";
  import { loginRequest } from "./AuthStore";

type LoginState = {
  loginId: string;
  password: string;
  isLoading: boolean;
  setLoginId: (v: string) => void;
  setPassword: (v: string) => void;
  login: () => Promise<void>;
};

export const useLoginStore = create<LoginState>((set, get) => ({
  loginId: "",
  password: "",
  isLoading: false,
  setLoginId: (v) => set({ loginId: v }),
  setPassword: (v) => set({ password: v }),

  login: async () => {
    const { loginId, password } = get();
    if (!loginId || !password) {
      throw new Error("아이디와 비밀번호를 입력해주세요.");
    }

    try {
      set({ isLoading: true });
      const data = await loginRequest(loginId, password);
      useAuthStore.getState().login(data.accessToken);
    } finally {
      set({ isLoading: false });
    }
  },
}));
