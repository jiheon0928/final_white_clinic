import { RiderState } from "@/types/stores/zustandStore.types";
import { create } from "zustand";

const useRiderStore = create<RiderState>((set) => ({
  rider: {
    name: "",
    birth: "",
    phone: "",
    email: "",
    address: "",
    zipcode: "",
    detailAddress: "",
    significant: "",
    industry: [],
    benefit: 0,
  },
  benefitType: [0.4, 0.5, 0.6],
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
        phone: "",
        email: "",
        address: "",
        zipcode: "",
        detailAddress: "",
        significant: "",
        benefit: 0,
        industry: [],
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
