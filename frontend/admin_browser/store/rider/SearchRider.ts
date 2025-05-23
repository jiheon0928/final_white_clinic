import { create } from "zustand";
import { riderList } from "@/data/data";
import { Rider } from "@/types/RiderStore/RiderTypes";
import { RiderSearchStore } from "@/types/RiderStore/RiderSearchTypes";

export const useRiderStore = create<RiderSearchStore>((set, get) => ({
  search: "",
  riders: riderList(),
  filteredRiders: riderList(),

  setSearch: (value: string) => {
    set({ search: value });
    get().filterRiders(value);
  },

  filterRiders: (search: string) => {
    const lowerSearch = search.toLowerCase();
    const filtered = get().riders.filter(
      (rider: Rider) =>
        rider.name.toLowerCase().includes(lowerSearch) ||
        rider.phone.includes(search)
    );
    set({ filteredRiders: filtered });
  },

  resetRiders: () => {
    set({ search: "", filteredRiders: get().riders });
  },
}));
