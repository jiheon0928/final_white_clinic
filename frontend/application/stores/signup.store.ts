import { create } from "zustand";

type IndustryType = "에어컨" | "세탁기";

type SignupState = {
  user: {
    loginId: string;
    password: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    zipcode: string;
    detailAddress: string;
    birth: string;
    industry: IndustryType[];
  };
  setUserField: <K extends keyof SignupState["user"]>(
    key: K,
    value: SignupState["user"][K]
  ) => void;
  resetUser: () => void;
};

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
