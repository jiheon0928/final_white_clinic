import { SignupState } from "@/types/stores/zustandStore.types";
import { create } from "zustand";

const useSignupStore = create<SignupState>((set) => ({
  user: {
    loginId: "",
    password: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    zipcode: "",
    detailAddress: "",
    birth: "",
    industry: [],
  },
  setUserField: (key, value) => {
    set((state) => ({
      user: {
        ...state.user,
        [key]: value,
      },
    }));
  },
  resetUser: () =>
    set(() => ({
      user: {
        loginId: "",
        password: "",
        name: "",
        phone: "",
        email: "",
        address: "",
        zipcode: "",
        detailAddress: "",
        birth: "",
        industry: [],
      },
    })),
}));

export default useSignupStore;
