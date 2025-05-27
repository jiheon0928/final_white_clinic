import EditMyPage from "@/components/rider/user/EditMy";
import { useLocalSearchParams } from "expo-router";

const EditMy = () => {
  const { id } = useLocalSearchParams();
  return <EditMyPage />;
};
export default EditMy;
