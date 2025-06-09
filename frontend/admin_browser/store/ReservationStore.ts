// store/ReservationStore.ts
import { ReservationStoreType } from "@/types/RevStore/ReservationTypes";
import { create } from "zustand";

export const useReservationStore = create<ReservationStoreType>((set) => ({
  // ▶️ 상태 초기값
  selectedItems: [],
  manager: "",
  currentStatus: "대기",
  reservationData: {
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
    industry: 1,
  },

  // ▶️ 액션: 체크박스 토글
  handleCheckboxChange: (value) =>
    set((state) => ({
      selectedItems: state.selectedItems.includes(value)
        ? state.selectedItems.filter((id) => id !== value)
        : [...state.selectedItems, value],
    })),

  // ▶️ 액션: 상태 변경
  setStatus: (status) => set({ currentStatus: status }),

  // ▶️ 액션: 폼 필드 변경(input, textarea, select)
  handleChange: (e) => {
    const target = e.target;
    const { name, type } = target;
    const value =
      type === "checkbox"
        ? (target as HTMLInputElement).checked
        : (target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)
            .value;
    set((state) => ({
      reservationData: {
        ...state.reservationData,
        [name]: value,
      },
    }));
  },

  // ▶️ 액션: formData 일괄 세팅 (예: 수정폼 초기화)
  setFormData: (data) =>
    set((state) => ({
      reservationData: {
        ...state.reservationData,
        ...data,
      },
    })),

  // ▶️ 액션: 제출 핸들러 (예시 로깅)
  handleSubmit: (e) => {
    e.preventDefault();
    console.log("Reservation submitted ▶️", {
      selectedItems: useReservationStore.getState().selectedItems,
      manager: useReservationStore.getState().manager,
      currentStatus: useReservationStore.getState().currentStatus,
      reservationData: useReservationStore.getState().reservationData,
    });
  },
}));
