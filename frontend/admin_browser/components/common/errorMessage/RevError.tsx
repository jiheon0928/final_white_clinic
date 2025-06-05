import { Reservation } from "@/types/RevStore/ReservationTypes";
import Button from "../Button";

export const RevErrorMessage = ({
  isLoading,
  error,
  getReservations,
  reservations,
}: {
  isLoading: boolean;
  error: string;
  getReservations: () => void;
  reservations: Reservation[];
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        <p>데이터를 불러오는데 실패했습니다.</p>
        <p className="text-sm">{error}</p>
        <Button
          title="다시 시도"
          onClick={() => getReservations()}
          className="mt-2 bg-blue-500 hover:bg-blue-600"
        />
      </div>
    );
  }

  if (reservations.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500">예약이 없습니다.</div>
    );
  }

  return null;
};
