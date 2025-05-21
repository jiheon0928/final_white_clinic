import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Page from "@/components/common/Page";
const ReservationDetail = () => {
  const { id } = useLocalSearchParams();
  return (
    <Page>
      <Text>{id}상세</Text>
    </Page>
  );
};

export default ReservationDetail;
