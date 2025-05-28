import { ReservationState } from "@/types/stores/zustandStore.types";
import { create } from "zustand";

const useReservationStore = create<ReservationState>((set) => ({
  reservation: {
    customerName: "",
    customerPhone: "",
    customerRequest: "",
    customerZipCode: "",
    customerAddress: "",
    customerDetailAddress: "",
    visitTime: new Date(),
    reservationStatus: "대기",
    reservationPrice: "0",
  },
  status: "대기",
  searchValue: "",
  setStatus: (status: "대기" | "진행" | "완료") => set({ status }),
  setSearchValue: (searchValue: string) => set({ searchValue }),
  setReservationField: (
    field: keyof ReservationState["reservation"],
    value: string | Date
  ) =>
    set((state) => ({
      reservation: { ...state.reservation, [field]: value },
    })),
  resetReservation: () =>
    set({
      reservation: {
        customerName: "",
        customerPhone: "",
        customerRequest: "",
        customerZipCode: "",
        customerAddress: "",
        customerDetailAddress: "",
        visitTime: new Date(),
        reservationStatus: "대기",
        reservationPrice: "0",
      },
    }),
}));

export default useReservationStore;
