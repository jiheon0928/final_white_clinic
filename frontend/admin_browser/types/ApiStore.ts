import { ReservationList } from "./RevStore/ReservationTypes";
import { RiderInfoList, Rider } from "./RiderStore/RiderTypes";

export type ApiStore = {
  riders: RiderInfoList;
  reservations: ReservationList;
  isLoading: boolean;
  error: string | null;
  getRiders: () => Promise<void>;
  getReservations: (status: "대기" | "진행" | "완료") => Promise<void>;
  updateRiderBenefit: (riderId: number, benefit: number) => void;
  updateRiderApproval: (riderId: number) => void;
  getApprovedRiders: () => RiderInfoList;
  getRiderInfo: (riderId: number) => Promise<Rider>;
  getRiderNames: () => Promise<{ id: number; name: string }[]>;
  updateRiderInfo: (riderId: number, updateData: any) => Promise<Rider>;
  updateReservation: (reservationId: number, updateData: any) => Promise<any>;
};
