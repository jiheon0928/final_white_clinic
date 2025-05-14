import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

const ReservationDetail = () => {
  const { status } = useLocalSearchParams();
  return (
    <View>
      <Text>{status}</Text>
    </View>
  );
};

export default ReservationDetail;
