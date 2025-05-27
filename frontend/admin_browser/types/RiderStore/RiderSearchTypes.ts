import { RiderInfoList } from "./RiderTypes";

export type RiderSearchStore = {
  search: string;
  riders: RiderInfoList;
  filteredRiders: RiderInfoList;
  setSearch: (value: string) => void;
  filterRiders: (search: string) => void;
  resetRiders: () => void;
  setRiders: (riders: RiderInfoList) => void;
};
