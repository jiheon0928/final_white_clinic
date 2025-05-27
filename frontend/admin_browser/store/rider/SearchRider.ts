import { create } from "zustand";
import { RiderSearchStore } from "@/types/RiderStore/RiderSearchTypes";

export const useRiderStore = create<RiderSearchStore>((set, get) => ({
  riders: [],
  filteredRiders: [],
  search: "",

  setRiders: (riders) => {
    const approvedRiders = riders.filter((rider) => rider.approval === true);
    set({ riders: approvedRiders, filteredRiders: approvedRiders });
  },

  setSearch: (searchTerm) => {
    set({ search: searchTerm });
    get().filterRiders(searchTerm);
  },

  filterRiders: (searchTerm) => {
    const { riders } = get();
    const filtered = riders.filter(
      (rider) =>
        rider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rider.phone.includes(searchTerm)
    );
    set({ filteredRiders: filtered });
  },

  getApprovedRiders: () => {
    const { riders } = get();
    return riders.filter((rider) => rider.approval === true);
  },
}));
