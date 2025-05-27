import { create } from "zustand";

type ReservationState = {
  reservation: {
    customerName: string;
    customerPhone: string;
    customerRequest: string;
    customerZipCode: string;
    customerAddress: string;
    customerDetailAddress: string;
    visitTime: Date;
    reservationStatus: "대기" | "진행" | "완료";
    reservationPrice: string;
  };
  status: "대기" | "진행" | "완료";
  searchValue: string;
  setStatus: (status: "대기" | "진행" | "완료") => void;
  setSearchValue: (searchValue: string) => void;
  setReservationField: (
    field: keyof ReservationState["reservation"],
    value: string | Date
  ) => void;
  resetReservation: () => void;
};

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
