import { create } from "zustand";
import { RiderInfoStore } from "@/types/RiderStore/RiderInfoTypes";

const useRiderStore = create<RiderInfoStore>((set) => ({
  riderData: {
    name: "",
    birth: "",
    phone: "",
    address: "",
    detailAddress: "",
    zipcode: "",
    email: "",
    significant: "",
    industry: [],
    benefit: 0,
  },
  handleChange: (e) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if (Array.isArray(value)) {
      set((state) => ({
        riderData: {
          ...state.riderData,
          [name]: value,
        },
      }));
      return;
    }
    set((state) => ({
      riderData: {
        ...state.riderData,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  },

  handleSubmit: (e) => {
    e.preventDefault();
    console.log("Form submitted");
  },
  setFormData: (data) => {
    set(() => ({
      riderData: {
        name: "",
        birth: "",
        phone: "",
        address: "",
        detailAddress: "",
        zipcode: "",
        email: "",
        significant: "",
        industry: [],
        benefit: 0,
        ...data, // 필요한 것만 덮어씀
      },
    }));
  },
}));

export default useRiderStore;
