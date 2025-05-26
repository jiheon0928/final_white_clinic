import { create } from "zustand";

type IndustryType = "에어컨" | "세탁기";

type SignupState = {
  user: {
    name: string;
    phone: string;
    email: string;
    address: string;
    zipcode: string;
    detailAddress: string;
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
    name: "",
    phone: "",
    email: "",
    address: "",
    zipcode: "",
    detailAddress: "",
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
        name: "",
        phone: "",
        email: "",
        address: "",
        zipcode: "",
        detailAddress: "",
        industry: [],
      },
    })),
}));

export default useSignupStore;
