import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
const ReservationDetail = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>{id}상세</Text>
    </View>
  );
};

export default ReservationDetail;
