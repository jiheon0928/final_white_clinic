import { create } from "zustand";

interface ReservationStore {
  selectedItems: string[];
  manager: string;
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
  handleCheckboxChange: (value: string) => void;
  setManager: (value: string) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useReservationStore = create<ReservationStore>((set) => ({
  selectedItems: [],
  manager: "",
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
  handleCheckboxChange: (value) =>
    set((state) => ({
      selectedItems: state.selectedItems.includes(value)
        ? state.selectedItems.filter((item) => item !== value)
        : [...state.selectedItems, value],
    })),
  setManager: (value) => set({ manager: value }),
  handleChange: (e) => {
    const { name, value, type, checked } = e.target;
    set((state) => ({
      formData: {
        ...state.formData,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  },
}));
