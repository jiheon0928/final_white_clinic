import { ReservationList } from "./RevStore/ReservationTypes";
import { RiderInfoList } from "./RiderStore/RiderTypes";
import { VerificationList } from "./VerificationTypes";

export type ApiStore = {
  riders: RiderInfoList;
  reservations: ReservationList;
  verificationPending: VerificationList;
  getRiders: () => Promise<void>;
  getReservations: () => Promise<void>;
  getVerificationPending: () => Promise<void>;
};
