import { create } from "zustand";

type IndustryType = "에어컨" | "세탁기";

type EditRiderState = {
  rider: {
    name: string;
    phone: string;
    email: string;
    birth: string;
    zipcode: string;
    address: string;
    detailAddress: string;
    significant: string;
    industry: IndustryType[];
    benefit: number;
  };
  setRiderField: <K extends keyof EditRiderState["rider"]>(
    key: K,
    value: EditRiderState["rider"][K]
  ) => void;
  setRider: (data: Partial<EditRiderState["rider"]>) => void;
  resetRider: () => void;
};

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
      },
    }));
  },
}));

export default useEditRiderStore;
