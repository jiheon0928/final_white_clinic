import { create } from "zustand";
import axios from "axios";
import { ApiStore } from "@/types/ApiStore";
import { useRiderSearchStore } from "./rider/SearchRider";

const API_URL = "http://localhost:3001/api";

// axios 인스턴스 생성
export const api = axios.create({
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
  getReservations: async (status: "대기" | "진행" | "완료") => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get(`/reservation?status=${status}`);
      console.log("API 응답 데이터:", response.data);
      const visitTime = response.data.map((reservation: any) => ({
        ...reservation,
        visitTime: reservation.visitTime.toString(),
      }));
      set({
        reservations: visitTime,
        isLoading: false,
      });
    } catch (error) {
      console.error("예약 데이터 가져오기 실패:", error);
      throw error;
    }
  },

  // 예약 생성
  createReservation: async (reservationData: any) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.post("/reservation", reservationData);
      console.log("예약 생성 응답:", response.data);
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      console.error("예약 생성 실패:", error);
      set({
        error: "예약 생성에 실패했습니다.",
        isLoading: false,
      });
      throw error;
    }
  },

  // 예약 수정
  updateReservation: async (reservationName: string, updateData: any) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.patch(
        `/reservation/${reservationName}`,
        updateData
      );
      console.log("예약 수정 응답:", response.data);
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      console.error("예약 수정 실패:", error);
      set({
        error: "예약 수정에 실패했습니다.",
        isLoading: false,
      });
      throw error;
    }
  },

  // 기사 데이터
  getRiders: async () => {
    try {
      set((state) => {
        if (state.riders.length > 0) {
          return {};
        }
        return { isLoading: true, error: null };
      });
      const response = await api.get("/user");
      console.log("API 응답 데이터:", response.data);
      const birthDate = response.data.map((rider: any) => ({
        ...rider,
        birth: rider.birth.toString(),
      }));
      set({
        riders: birthDate,
        isLoading: false,
      });
      useRiderSearchStore.getState().setRiders(response.data);
    } catch (error) {
      console.error("기사 데이터 가져오기 실패:", error);
      throw error;
    }
  },

  // 기사 정보 수정
  updateRiderInfo: async (riderId: number, updateData: any) => {
    try {
      set({ isLoading: true, error: null });
      const rider = get().riders.find((r) => r.id === riderId);
      if (!rider) {
        throw new Error("기사를 찾을 수 없습니다.");
      }
      const response = await api.patch(`/user/${rider.id}`, updateData);
      console.log("기사 정보 수정 응답:", response.data);
      const updatedRiders = get().riders.map((r) =>
        r.id === rider.id ? { ...r, ...response.data } : r
      );
      set({
        riders: updatedRiders,
        isLoading: false,
      });
      useRiderSearchStore.getState().setRiders(updatedRiders);
      return response.data;
    } catch (error) {
      console.error("기사 정보 수정 실패:", error);
      set({
        error: "기사 정보 수정에 실패했습니다.",
        isLoading: false,
      });
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

  // 이름으로 기사 상세 정보 가져오기
  getRiderInfoByName: async (name: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get(`/user/${name}`);
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      console.error("기사 이름으로 상세 정보 가져오기 실패:", error);
      set({
        error: "기사 이름으로 상세 정보를 가져오는데 실패했습니다.",
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
      useRiderSearchStore.getState().setRiders(response.data);
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
