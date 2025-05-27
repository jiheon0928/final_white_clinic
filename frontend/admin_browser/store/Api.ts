import { create } from "zustand";
import axios from "axios";
import { ApiStore } from "@/types/ApiStore";
import { useRiderStore } from "./rider/SearchRider";

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

export const useApiStore = create<ApiStore>((set, get) => ({
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
      const response = await api.get("/user");
      console.log("API 응답 데이터:", response.data);
      set({
        riders: response.data,
        isLoading: false,
      });
      // RiderStore 업데이트
      useRiderStore.getState().setRiders(response.data);
    } catch (error) {
      console.error("기사 데이터 가져오기 실패:", error);
      throw error;
    }
  },

  // 기사 수수료 업데이트
  updateRiderBenefit: (riderId: number, benefit: number) => {
    set((state) => ({
      riders: state.riders.map((rider) =>
        rider.id === riderId ? { ...rider, benefit } : rider
      ),
    }));
  },

  // 기사 승인 상태 업데이트
  updateRiderApproval: async (riderId: number) => {
    try {
      set({ isLoading: true, error: null });
      await api.patch(`/user/${riderId}/approval`);
      const response = await api.get("/user");
      set({
        riders: response.data,
        isLoading: false,
      });
      // RiderStore 업데이트
      useRiderStore.getState().setRiders(response.data);
    } catch (error) {
      console.error("기사 승인 상태 업데이트 실패:", error);
      set({
        error: "기사 승인 상태 업데이트에 실패했습니다.",
        isLoading: false,
      });
      throw error;
    }
  },

  // 승인된 기사만 필터링
  getApprovedRiders: () => {
    return get().riders.filter((rider) => rider.approval === true);
  },
}));
