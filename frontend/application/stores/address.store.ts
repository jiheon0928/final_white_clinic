import { create } from "zustand";

type AddressStore = {
  zipcode: string;
  address: string;
  detailAddress: string;
  setAddress: (zipcode: string, address: string) => void;
  setDetailAddress: (detailAddress: string) => void;
  resetAddress: () => void;
};

const useAddressStore = create<AddressStore>((set) => ({
  zipcode: "",
  address: "",
  detailAddress: "",
  setAddress: (zipcode, address) => set({ zipcode, address }),
  setDetailAddress: (detailAddress) => set({ detailAddress }),
  resetAddress: () => set({ zipcode: "", address: "", detailAddress: "" }),
}));

export default useAddressStore;
