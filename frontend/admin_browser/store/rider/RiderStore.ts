import { create } from "zustand";
import { RiderInfoStore } from "@/types/RiderStore/RiderInfoTypes";

const useRiderStore = create<RiderInfoStore>((set) => ({
  formData: {
    name: "",
    birth: "",
    loginId: "",
    password: "",
    phone: "",
    address: "",
    detailAddress: "",
    zipcode: "",
    email: "",
    significant: "",
    approval: false,
    industryIds: [],
    benefitId: 0,
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
  setFormData: (data: Partial<RiderInfoStore["formData"]>) => {
    set((state) => ({
      formData: {
        ...state.formData,
        ...data,
      },
    }));
  },
}));

export default useRiderStore;
