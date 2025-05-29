"use client";
import { create } from "zustand";
import { RevCardStates } from "@/types/RevStore/RevCardStates";

export const useReservationStore = create<RevCardStates>((set) => ({
  selectedItems: [], // 선택된 아이템 상태에 따라 배열로 저장
  manager: "",
  currentStatus: "대기", // 기본값
  formData: {
    reservationName: "",
    customerName: "",
    customerPhone: "",
    customerRequest: "",
    zipcode: "",
    address: "",
    detailAddress: "",
    visitTime: "",
    memo: "",
    price: 0,
    industryIds: 0,
  },
  handleCheckboxChange: (value) =>
    set((state) => ({
      selectedItems: state.selectedItems.includes(value)
        ? state.selectedItems.filter((item) => item !== value)
        : [...state.selectedItems, value],
    })),
  setManager: (value) =>
    set((state) => ({
      manager: value,
      formData: {
        ...state.formData,
        manager: value,
      },
    })),
  setStatus: (status) => set({ currentStatus: status }),
  handleChange: (e) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [e.target.name]: e.target.value,
      },
    })),
  setFormData: (data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        ...data,
      },
    })),
}));
