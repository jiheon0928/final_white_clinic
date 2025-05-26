import { create } from "zustand";

// industry.store.ts
export type IndustryType = "에어컨" | "세탁기";

type IndustryStore = {
  industry: IndustryType[];
  toggle: (label: IndustryType, checked: boolean) => void;
  setSelected: (list: IndustryType[]) => void;
  resetIndustry: () => void;
};

const useIndustryStore = create<IndustryStore>((set) => ({
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
