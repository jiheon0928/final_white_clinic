import { ReservationList } from "./RevStore/ReservationTypes";
import { RiderInfoList } from "./RiderStore/RiderTypes";

export type ApiStore = {
  riders: RiderInfoList;
  reservations: ReservationList;
  isLoading: boolean;
  error: string | null;
  getRiders: () => Promise<void>;
  getReservations: () => Promise<void>;
};
