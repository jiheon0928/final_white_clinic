import { RiderState } from "@/types/stores/zustandStore.types";
import { create } from "zustand";

const useRiderStore = create<RiderState>((set) => ({
  rider: {
    name: "",
    birth: "",
    loginId: "",
    password: "",
    phone: "",
    email: "",
    address: "",
    zipcode: "",
    detailAddress: "",
    significant: "",
    industries: [],
    benefit: 0.4,
    approval: false,
    industryId: 0,
  },
  searchRiderValue: "",
  setRider: (data) =>
    set((state) => ({
      rider: {
        ...state.rider,
        ...data,
      },
    })),
  setRiderField: (key, value) => {
    set((state) => ({
      rider: {
        ...state.rider,
        [key]: value,
      },
    }));
  },
  resetRider: () => {
    set(() => ({
      rider: {
        name: "",
        birth: "",
        loginId: "",
        password: "",
        phone: "",
        email: "",
        address: "",
        zipcode: "",
        detailAddress: "",
        significant: "",
        industries: [],
        benefit: 0.4,
        approval: false,
        industryId: 0,
      },
    }));
  },
  setSearchRiderValue: (value) => {
    set(() => ({
      searchRiderValue: value,
    }));
  },
}));

export default useRiderStore;
