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
  getReservations: async (status: "pending" | "progress" | "complete") => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get(`/reservation/${status}`);
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
      set((state) => {
        // 이미 로딩 중이거나 에러가 있으면 요청하지 않음
        if (state.riders.length > 0) {
          return {};
        }
        return { isLoading: true, error: null };
      });
      const response = await api.get("/user");
      console.log("API 응답 데이터:", response.data);
      set({
        riders: response.data,
        isLoading: false,
      });
      useRiderStore.getState().setRiders(response.data);
    } catch (error) {
      console.error("기사 데이터 가져오기 실패:", error);
      throw error;
    }
  },

  // 기사 이름 목록
  getRiderNames: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get("/user");
      set({ isLoading: false });
      return response.data.map((rider: any) => ({
        id: rider.id,
        name: rider.name,
      }));
    } catch (error) {
      console.error("기사 이름 목록 가져오기 실패:", error);
      set({
        error: "기사 이름 목록을 가져오는데 실패했습니다.",
        isLoading: false,
      });
      throw error;
    }
  },

  // 기사 상세 정보
  getRiderInfo: async (riderId: number) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get(`/user/${riderId}`);
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      console.error("기사 상세 정보 가져오기 실패:", error);
      set({
        error: "기사 상세 정보를 가져오는데 실패했습니다.",
        isLoading: false,
      });
      throw error;
    }
  },

  // 기사 수수료 업데이트
  updateRiderBenefit: (riderId: number, benefitType: number) => {
    set((state) => ({
      riders: state.riders.map((rider) =>
        rider.id === riderId
          ? { ...rider, benefit: { ...rider.benefit, benefitType } }
          : rider
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
