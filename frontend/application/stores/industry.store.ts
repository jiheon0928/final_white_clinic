import { create } from "zustand";

export type IndustryType = "에어컨" | "세탁기";

type IndustryStore = {
  selected: IndustryType[];
  toggle: (label: IndustryType, checked: boolean) => void;
  setSelected: (list: IndustryType[]) => void;
  clear: () => void;
};

const useIndustryStore = create<IndustryStore>((set) => ({
  selected: [],
  toggle: (label, checked) =>
    set((state) => ({
      selected: checked
        ? [...state.selected, label].filter((v, i, arr) => arr.indexOf(v) === i)
        : state.selected.filter((v) => v !== label),
    })),
  setSelected: (list) => set({ selected: list }),
  clear: () => set({ selected: [] }),
}));

export default useIndustryStore;
