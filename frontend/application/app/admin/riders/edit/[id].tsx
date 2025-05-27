import EditRiderPage from "@/components/rider/admin/EditRiderPage";
import { useLocalSearchParams } from "expo-router";

const EditRider = () => {
  const { id } = useLocalSearchParams();

  return <EditRiderPage id={id as string} />;
};

export default EditRider;
