import { IndustryState } from "@/types/stores/zustandStore.types";
import { create } from "zustand";

const useIndustryStore = create<IndustryState>((set) => ({
  industry: [],

  toggle: (label, checked) =>
    set((state) => ({
      industry: checked
        ? [...state.industry, label].filter((v, i, arr) => arr.indexOf(v) === i)
        : state.industry.filter((v) => v !== label),
    })),
  setSelected: (list) => set({ industry: list }),
  resetIndustry: () => set({ industry: [] }),
}));

export default useIndustryStore;
