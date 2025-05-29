import { ReservationState } from "@/types/stores/zustandStore.types";
import { create } from "zustand";

const useReservationStore = create<ReservationState>((set) => ({
  reservation: {
    reservationName: "",
    customerName: "",
    customerPhone: "",
    customerRequest: "",
    zipCode: "",
    address: "",
    detailAddress: "",
    visitTime: new Date(),
    memo: "",
    price: "0",
    industry: 0,
  },
  status: "대기",
  searchValue: "",
  setStatus: (status: "대기" | "진행" | "완료") => set({ status }),
  setSearchValue: (searchValue: string) => set({ searchValue }),
  setReservationField: (
    field: keyof ReservationState["reservation"],
    value: string | Date | number
  ) =>
    set((state) => ({
      reservation: { ...state.reservation, [field]: value },
    })),
  resetReservation: () =>
    set({
      reservation: {
        reservationName: "",
        customerName: "",
        customerPhone: "",
        customerRequest: "",
        zipCode: "",
        address: "",
        detailAddress: "",
        visitTime: new Date(),
        memo: "",
        price: "0",
        industry: 0,
      },
    }),
}));

export default useReservationStore;
