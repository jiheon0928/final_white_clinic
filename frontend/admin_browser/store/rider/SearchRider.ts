import { create } from "zustand";
import { Rider } from "@/types/RiderStore/RiderTypes";
import { RiderSearchStore } from "@/types/RiderStore/RiderSearchTypes";

export const useRiderStore = create<RiderSearchStore>((set, get) => ({
  search: "",
  riders: [],
  filteredRiders: [],

  setSearch: (value: string) => {
    set({ search: value });
    get().filterRiders(value);
  },

  filterRiders: (search: string) => {
    const lowerSearch = search.toLowerCase();
    const filtered = get().riders.filter(
      (rider: Rider) =>
        rider.approval &&
        (rider.name.toLowerCase().includes(lowerSearch) ||
          rider.phone.includes(search) ||
          rider.email.toLowerCase().includes(lowerSearch) ||
          rider.address.toLowerCase().includes(lowerSearch))
    );
    set({ filteredRiders: filtered });
  },

  resetRiders: () => {
    set({
      search: "",
      filteredRiders: get().riders.filter((rider) => rider.approval),
    });
  },

  setRiders: (riders: Rider[]) => {
    const approvedRiders = riders.filter((rider) => rider.approval);
    set({ riders: approvedRiders, filteredRiders: approvedRiders });
  },
}));
