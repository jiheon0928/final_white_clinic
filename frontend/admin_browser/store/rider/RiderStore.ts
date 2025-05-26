import { create } from "zustand";
import { RiderInfoStore } from "@/types/RiderStore/RiderInfoTypes";

const useRiderStore = create<RiderInfoStore>((set) => ({
  formData: {
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
    industry: false,
    birthDate: "",
    benefit: "",
  },
  handleChange: (e) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    set((state) => ({
      formData: {
        ...state.formData,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  },
  handleSubmit: (e) => {
    e.preventDefault();
    console.log("Form submitted");
  },
}));

export default useRiderStore;
