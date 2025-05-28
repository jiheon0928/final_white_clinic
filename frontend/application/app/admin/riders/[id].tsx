import RiderDetail from "@/components/rider/admin/RiderDetail";
import { useLocalSearchParams } from "expo-router";

const RiderDetailPage = () => {
  const { id } = useLocalSearchParams();
  return <RiderDetail id={id as string} />;
};

export default RiderDetailPage;
