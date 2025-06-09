import { Suspense } from "react";
import { ReservationUpdate } from "@/components/reservation/reservationUpdate/ReservationUpdate";

const UpdatePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReservationUpdate />
    </Suspense>
  );
};

export default UpdatePage;
