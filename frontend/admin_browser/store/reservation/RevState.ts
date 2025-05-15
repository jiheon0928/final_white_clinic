import { create } from "zustand";

type ReservationStatus = "진행중" | "완료" | "대기";

interface ReservationStore {
  currentStatus: ReservationStatus;
  setStatus: (status: ReservationStatus) => void;
}

export const useReservationStore = create<ReservationStore>((set) => ({
  currentStatus: "대기", // 기본값
  setStatus: (status) => set({ currentStatus: status }),
}));
