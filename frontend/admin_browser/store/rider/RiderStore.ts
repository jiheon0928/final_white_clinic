import { create } from "zustand";
import { RiderInfoStore } from "@/types/RiderStore/RiderTypes";

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
    if (e.target instanceof HTMLInputElement) {
      const { name, value, type, checked } = e.target;
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
    } else {
      const { name, value } = e.target;
      set((state) => ({
        riderData: {
          ...state.riderData,
          [name]: value,
        },
      }));
    }
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
