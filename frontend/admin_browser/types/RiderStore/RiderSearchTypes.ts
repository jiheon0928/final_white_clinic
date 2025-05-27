import { RiderInfoList } from "./RiderTypes";

export type RiderSearchStore = {
  riders: RiderInfoList;
  filteredRiders: RiderInfoList;
  search: string;
  setRiders: (riders: RiderInfoList) => void;
  setSearch: (searchTerm: string) => void;
  filterRiders: (searchTerm: string) => void;
  getApprovedRiders: () => RiderInfoList;
};
