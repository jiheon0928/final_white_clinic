import { create } from "zustand";

interface ReservationUpdateStore {
  selectedItems: string[];
  manager: string;
  handleCheckboxChange: (value: string) => void;
  setManager: (value: string) => void;
}

export const useReservationUpdateStore = create<ReservationUpdateStore>(
  (set) => ({
    selectedItems: [],
    manager: "",
    handleCheckboxChange: (value) =>
      set((state) => ({
        selectedItems: state.selectedItems.includes(value)
          ? state.selectedItems.filter((item) => item !== value)
          : [...state.selectedItems, value],
      })),
    setManager: (value) => set({ manager: value }),
  })
);
