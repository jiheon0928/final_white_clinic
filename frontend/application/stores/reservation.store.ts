import { create } from "zustand";
type ReservationState = {
  status: "대기" | "진행" | "완료";
  setStatus: (status: "대기" | "진행" | "완료") => void;
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
};

const useReservationStore = create<ReservationState>((set) => ({
  status: "대기",
  setStatus: (status: "대기" | "진행" | "완료") => set({ status }),
  searchValue: "",
  setSearchValue: (searchValue: string) => set({ searchValue }),
}));

export default useReservationStore;
