import { ReservationList } from "./RevStore/ReservationTypes";
import { RiderInfoList } from "./RiderStore/RiderTypes";

export type ApiStore = {
  riders: RiderInfoList;
  reservations: ReservationList;
  getRiders: () => Promise<void>;
  getReservations: () => Promise<void>;
};
