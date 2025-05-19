import { create } from "zustand";

interface ReservationEnrollState {
  formData: {
    name: string;
    phone: string;
    address: string;
    item: string;
    washer: boolean;
    dryer: boolean;
    date: string;
    time: string;
    message: string;
    price: number;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useReservationEnrollStore = create<ReservationEnrollState>(
  (set) => ({
    formData: {
      name: "",
      phone: "",
      address: "",
      item: "",
      washer: false,
      dryer: false,
      date: "",
      time: "",
      message: "",
      price: 0,
    },
    handleChange: (e) => {
      const { name, value, type, checked } = e.target;
      set((state) => ({
        formData: {
          ...state.formData,
          [name]: type === "checkbox" ? checked : value,
        },
      }));
    },
  })
);
