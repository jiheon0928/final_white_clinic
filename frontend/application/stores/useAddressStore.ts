import { create } from "zustand";

interface AddressState {
  zipCode: string;
  address: string;
  detailAddress: string;
  setZipCode: (zip: string) => void;
  setAddress: (addr: string) => void;
  setDetailAddress: (detail: string) => void;
}

export const useAddressStore = create<AddressState>((set) => ({
  zipCode: "",
  address: "",
  detailAddress: "",
  setZipCode: (zip) => set({ zipCode: zip }),
  setAddress: (addr) => set({ address: addr }),
  setDetailAddress: (detail) => set({ detailAddress: detail }),
}));
