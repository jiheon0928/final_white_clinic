import { create } from "zustand";

type DateStore = {
  date: string;
  setDate: (date: string) => void;
  resetDate: () => void;
};

const useDateStore = create<DateStore>((set) => ({
  date: new Date().toISOString().split("T")[0],
  setDate: (date) => set({ date }),
  resetDate: () => set({ date: new Date().toISOString().split("T")[0] }),
}));

export default useDateStore;
