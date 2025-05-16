import { create } from "zustand";

interface ReservationEnrollState {
  formData: {
    name: string;
    phone: string;
    address: string;
    item: string;
    message: string;
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
      message: "",
    },
    handleChange: (e) => {
      const { name, value } = e.target;
      set((state) => ({
        formData: {
          ...state.formData,
          [name]: value,
        },
      }));
    },
  })
);
