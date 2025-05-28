import { formatDate } from "../hooks/format";
import { DateState } from "@/types/stores";
import { create } from "zustand";

const useDateStore = create<DateState>((set) => ({
  date: formatDate(new Date()),
  setDate: (d) => set({ date: formatDate(d) }),
  setDateFromDate: (selected) => {
    const yyyy = selected.getFullYear();
    const mm = String(selected.getMonth() + 1).padStart(2, "0");
    const dd = String(selected.getDate()).padStart(2, "0");
    const formatted = new Date(`${yyyy}-${mm}-${dd}`);
    set({ date: formatDate(formatted) });
  },
  resetDate: () => set({ date: formatDate(new Date()) }),
}));

export default useDateStore;
