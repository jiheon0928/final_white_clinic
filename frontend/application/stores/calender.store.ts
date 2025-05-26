import { create } from "zustand";

type BirthStore = {
  birth: Date;
  setBirth: (date: Date) => void;
  setBirthFromDate: (selectedDate: Date) => void;
  resetBirth: () => void;
};

const useBirthStore = create<BirthStore>((set) => ({
  birth: new Date(),
  setBirth: (date) => set({ birth: date }),
  setBirthFromDate: (selectedDate) => {
    const yyyy = selectedDate.getFullYear();
    const mm = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const dd = String(selectedDate.getDate()).padStart(2, "0");
    const formatted = new Date(`${yyyy}-${mm}-${dd}`);
    set({ birth: formatted });
  },
  resetBirth: () => set({ birth: new Date() }),
}));

export default useBirthStore;
