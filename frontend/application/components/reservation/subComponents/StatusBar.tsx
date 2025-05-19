import { status } from "@/dummyData/reservationData";
import { statusBarStyles } from "@/styles/reservation/statusBar";
import { Pressable, Text } from "react-native";

import { View } from "react-native";

const StatusBar = () => {
  return (
    <View style={statusBarStyles.statusBar}>
      {status.map((status) => (
        <Pressable key={status.status} style={statusBarStyles.statusButton}>
          <Text>{status.status}</Text>
          <View
            style={[
              statusBarStyles.statusCircle,
              { backgroundColor: getStatusColor(status.status) },
            ]}
          />
        </Pressable>
      ))}
    </View>
  );
};

const getStatusColor = (status: string) => {
  if (status === "대기") {
    return "#4299e1";
  } else if (status === "진행") {
    return "#48bb78";
  } else if (status === "완료") {
    return "#a0aec0";
  }
};

export default StatusBar;
