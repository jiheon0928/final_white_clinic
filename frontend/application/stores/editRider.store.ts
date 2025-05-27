import { EditRiderState } from "@/types/stores";
import { create } from "zustand";

const useEditRiderStore = create<EditRiderState>((set) => ({
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
}));

export default useEditRiderStore;
