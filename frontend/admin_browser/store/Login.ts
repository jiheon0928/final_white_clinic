import { create } from "zustand";
import axios from "axios";
import { useRouter } from "next/router";
import { LoginState } from "@/types/LoginState";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const useLoginStore = create<LoginState>((set) => ({
  formData: {
    loginId: "",
    password: "",
  },
  handleChange: (e) => {
    const { name, value } = e.target;
    set((state) => ({
      formData: {
        ...state.formData,
        [name]: value,
      },
    }));
  },
  handleSubmit: async (e) => {
    e.preventDefault();

    const { loginId, password } = useLoginStore.getState().formData;
    if (!loginId || !password) {
      alert("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/auth/login`,
        { loginId, password },
        { withCredentials: true }
      );

      const nickname = response.data.result.nickname;
      const id = response.data.result.id;

      localStorage.setItem("nickname", nickname);
      localStorage.setItem("userId", id);
      alert("로그인에 성공했습니다!");

      useRouter().push("/reservation");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || "로그인에 실패했습니다.";
        alert(message);
      } else {
        alert("알 수 없는 에러가 발생했습니다.");
      }
      console.error("로그인 에러:", err);
    }
  },
}));
