import { create } from "zustand";

interface RiderUpdateStore {
  formData: {
    name: string;
    phone: string;
    email: string;
    address: string;
    notes: string;
    washer: boolean;
    dryer: boolean;
    birthDate: string;
    benefit: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useRiderUpdateStore = create<RiderUpdateStore>((set) => ({
  formData: {
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
    washer: false,
    dryer: false,
    birthDate: "",
    benefit: "",
  },
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    set((state) => ({
      formData: {
        ...state.formData,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  },
}));
