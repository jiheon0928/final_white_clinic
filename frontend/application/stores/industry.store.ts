import { IndustryState } from "@/types/stores/zustandStore.types";
import { create } from "zustand";

const useIndustryStore = create<IndustryState>((set) => ({
  industry: [],
  industryOptions: ["에어컨", "세탁기", "건조기"],
  selectedIndustry: null,
  industryId: 0,
  setSelectedIndustry: (selected: string) =>
    set((state) => {
      if (selected === "에어컨") state.industryId = 1;
      else if (selected === "세탁기") state.industryId = 2;
      else if (selected === "건조기") state.industryId = 3;

      return {
        ...state,
        selectedIndustry: selected,
        industryId: state.industryId,
      };
    }),
  toggle: (label, checked) =>
    set((state) => ({
      industry: checked
        ? [...state.industry, label].filter((v, i, arr) => arr.indexOf(v) === i)
        : state.industry.filter((v) => v !== label),
    })),
  setSelected: (list) => set({ industry: list }),
  resetIndustry: () =>
    set({ industry: [], industryId: 0, selectedIndustry: null }),
}));

export default useIndustryStore;
