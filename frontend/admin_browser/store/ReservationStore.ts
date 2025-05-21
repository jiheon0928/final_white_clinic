import { create } from "zustand";
import { RevCardStates } from "@/types/RevStore/RevCardStates";

export const useReservationStore = create<RevCardStates>((set) => ({
  selectedItems: [], // 선택된 아이템 상태에 따라 배열로 저장
  manager: "",
  currentStatus: "대기", // 기본값
  setStatus: (status) => set({ currentStatus: status }),
  formData: {
    name: "",
    phone: "",
    address: "",
    item: "",
    washer: false,
    dryer: false,
    date: "",
    time: "",
    message: "",
    price: 0,
  },
  handleCheckboxChange: (value) =>
    set((state) => ({
      selectedItems: state.selectedItems.includes(value)
        ? state.selectedItems.filter((item) => item !== value)
        : [...state.selectedItems, value],
    })),
  setManager: (value) => set({ manager: value }),
  handleChange: (e) => {
    const { name, value, type, checked } = e.target;
    set((state) => ({
      formData: {
        ...state.formData,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  },
}));
