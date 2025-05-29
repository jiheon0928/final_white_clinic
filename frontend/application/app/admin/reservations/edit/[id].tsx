import ReservationHandler from "@/components/reservation/admin/ReservationHandler";
import { useLocalSearchParams } from "expo-router";

const EditReservationScreen = () => {
  const { id } = useLocalSearchParams();
  return <ReservationHandler id={id as string} title="예약 수정" />;
};

export default EditReservationScreen;
