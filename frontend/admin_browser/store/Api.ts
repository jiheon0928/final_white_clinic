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

// 로그인
export const loginRequest = async (loginId: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    loginId,
    password,
  });
  return response.data;
};

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
      const sortedReservations = visitTime.sort((a: any, b: any) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
      set({
        reservations: sortedReservations,
        isLoading: false,
      });
    } catch (error) {
      console.error("예약 데이터 가져오기 실패:", error);
      throw error;
    }
  },

  // ID로 예약 조회
  getReservationById: async (id: number) => {
    try {
      const response = await api.get(`/reservation/id/${id}`);
      set({
        reservations: response.data,
        isLoading: true,
        error: null,
      });
    } catch (error) {
      set({
        error: "예약 조회에 실패했습니다.",
        isLoading: false,
      });
      throw error;
    }
  },

  // 예약 생성
  createReservation: async (reservationData: any) => {
    console.log("reservationData :", reservationData);
    try {
      set({ isLoading: true, error: null });
      const data = {
        ...reservationData,
        price: Number(reservationData.price),
      };
      const response = await api.post("/reservation", data);
      console.log("예약 생성 응답:", response.data);
      const updatedResponse = await api.get(`/reservation?status=대기`);
      set({
        reservations: updatedResponse.data,
        isLoading: false,
      });
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
  updateReservation: async (reservationId: number, updateData: any) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.patch(
        `/reservation/id/${reservationId}`,
        updateData
      );
      console.log("예약 수정 응답:", response.data);
      const updatedResponse = await api.get(
        `/reservation?status=${updateData.status || "대기"}`
      );
      set({
        reservations: updatedResponse.data,
        isLoading: false,
      });
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
      const birthDate = response.data;
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
      const response = await api.patch(
        `/user/correction/${rider.id}`,
        updateData
      );
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
        error:
          error instanceof Error
            ? error.message
            : "기사 정보 수정에 실패했습니다.",
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
      return response.data
        .map((rider: any) => ({
          id: rider.id,
          name: rider.name,
        }))
        .sort((a: any, b: any) => a.name.localeCompare(b.name)); // 가나다순 정렬
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
      const response = await api.get(`/user/id/${riderId}`);
      console.log("기사 상세 정보:", response.data);
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
        rider.id === riderId ? { ...rider, benefitId: benefitType } : rider
      ),
    }));
  },

  // 기사 승인 상태 업데이트
  updateRiderApproval: async (riderId: number) => {
    try {
      set({ isLoading: true, error: null });
      await api.patch(`/user/approval/${riderId}`);
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
