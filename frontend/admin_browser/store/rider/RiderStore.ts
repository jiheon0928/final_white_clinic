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
    industry: [],
    benefit: 0,
  },
  handleChange: (e) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    // 배열 또는 객체 형태 처리용: 외부에서 직접 넘긴 경우
    if (Array.isArray(value)) {
      set((state) => ({
        formData: {
          ...state.formData,
          [name]: value,
        },
      }));
      return;
    }

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
  setFormData: (data) => {
    set(() => ({
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
        industry: [],
        benefit: 0,
        ...data, // 필요한 것만 덮어씀
      },
    }));
  },
}));

export default useRiderStore;
