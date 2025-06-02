import { create } from "zustand";

export type RevStoreState = {
  reservation: {
    reservationName: string;
    customerName: string;
    customerPhone: string;
    customerRequest: string;
    zipcode: string;
    address: string;
    detailAddress: string;
    visitTime: Date | string;
    memo: string;
    price: number;
    industry: number;
  };
  setReservation: <K extends keyof RevStoreState["reservation"]>(
    key: K,
    value: RevStoreState["reservation"][K]
  ) => void;
  resetReservation: () => void;
};

const initialState: RevStoreState["reservation"] = {
  reservationName: "",
  customerName: "",
  customerPhone: "",
  customerRequest: "",
  zipcode: "",
  address: "",
  detailAddress: "",
  visitTime: "",
  memo: "",
  price: 0,
  industry: 0,
};

export const useRevStore = create<RevStoreState>((set) => ({
  reservation: {
    reservationName: "",
    customerName: "",
    customerPhone: "",
    customerRequest: "",
    zipcode: "",
    address: "",
    detailAddress: "",
    visitTime: "",
    memo: "",
    price: 0,
    industry: 0,
  },
  setReservation: <K extends keyof RevStoreState["reservation"]>(
    key: K,
    value: RevStoreState["reservation"][K]
  ) =>
    set((state) => ({
      reservation: { ...state.reservation, [key]: value },
    })),
  resetReservation: () => set({ reservation: initialState }),
}));
