import ReservationDetail from "@/components/reservation/rider/ReservationDetail";
import { useLocalSearchParams } from "expo-router";

const ReservationDetailPage = () => {
  const { id } = useLocalSearchParams();
  return <ReservationDetail id={id as string} />;
};

export default ReservationDetailPage;
