import { AddressState } from "@/types/stores";
import { create } from "zustand";

const useAddressStore = create<AddressState>((set) => ({
  zipcode: "",
  address: "",
  detailAddress: "",

  setAddress: (key, value) => set((state) => ({ [key]: value })),

  resetAddress: () => set({ zipcode: "", address: "", detailAddress: "" }),
}));

export default useAddressStore;
