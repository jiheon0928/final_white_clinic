import { RiderState } from "@/types/stores";
import { create } from "zustand";

const useRiderStore = create<RiderState>((set) => ({
  rider: {
    name: "",
    phone: "",
    email: "",
    address: "",
    zipcode: "",
    detailAddress: "",
    birth: "",
    significant: "",
    industry: [],
    benefit: 0.4,
    approval: false,
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
        phone: "",
        email: "",
        address: "",
        zipcode: "",
        birth: "",
        detailAddress: "",
        significant: "",
        industry: [],
        benefit: 0.4,
        approval: false,
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
