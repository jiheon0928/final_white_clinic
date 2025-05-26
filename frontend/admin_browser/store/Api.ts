import { create } from "zustand";
import axios from "axios";
import { ApiStore } from "@/types/ApiStore";

const API_URL = "http://localhost:3001/api";

// axios 인스턴스 생성
const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const useApiStore = create<ApiStore>((set) => ({
  riders: [],
  reservations: [],
  isLoading: false,
  error: null,

  // 예약자 데이터
  getReservations: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get("/list/pending");
      console.log("API 응답 데이터:", response.data);
      set({
        reservations: response.data,
        isLoading: false,
      });
    } catch (error) {
      console.error("예약 데이터 가져오기 실패:", error);
      throw error;
    }
  },

  // 기사 데이터
  getRiders: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get("/riders");
      set({
        riders: response.data,
        isLoading: false,
      });
    } catch (error) {
      console.error("기사 데이터 가져오기 실패:", error);
      let errorMessage = "알 수 없는 에러가 발생했습니다.";

      if (axios.isAxiosError(error)) {
        if (error.response) {
          errorMessage = `서버 에러: ${error.response.status} - ${
            error.response.data?.message || "알 수 없는 서버 에러"
          }`;
        } else if (error.request) {
          errorMessage =
            "서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.";
        } else {
          errorMessage = `요청 에러: ${error.message}`;
        }
      }

      set({
        riders: [],
        isLoading: false,
        error: errorMessage,
      });
    }
  },
}));
