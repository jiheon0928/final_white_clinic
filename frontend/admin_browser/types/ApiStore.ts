import { ReservationList } from "./RevStore/ReservationTypes";
import { RiderInfoList, Rider } from "./RiderStore/RiderTypes";

export type ApiStore = {
  riders: RiderInfoList;
  reservations: ReservationList;
  isLoading: boolean;
  error: string | null;
  getRiders: () => Promise<void>;
  getReservations: (
    status: "pending" | "progress" | "complete"
  ) => Promise<void>;
  updateRiderBenefit: (riderId: number, benefit: number) => void;
  updateRiderApproval: (riderId: number) => void;
  getApprovedRiders: () => RiderInfoList;
  getRiderInfo: (riderId: number) => Promise<Rider>;
  getRiderNames: () => Promise<{ id: number; name: string }[]>;
  updateRiderInfo: (riderName: string, updateData: any) => Promise<Rider>;
};
