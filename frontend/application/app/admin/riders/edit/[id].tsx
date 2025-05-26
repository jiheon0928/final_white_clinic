import EditRiderPage from "@/components/rider/admin/EditRiderPage";
import { useLocalSearchParams } from "expo-router";

const EditRider = () => {
  const { id } = useLocalSearchParams();

  return <EditRiderPage />;
};

export default EditRider;
