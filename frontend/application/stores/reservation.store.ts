import { create } from "zustand";
type ReservationState = {
  status: "대기" | "진행" | "완료";
  setStatus: (status: "대기" | "진행" | "완료") => void;
};

const useReservationStore = create<ReservationState>((set) => ({
  status: "대기",
  setStatus: (status: "대기" | "진행" | "완료") => set({ status }),
}));

export default useReservationStore;
