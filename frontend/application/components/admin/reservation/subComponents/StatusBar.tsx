import StatusPill from "@/components/common/StatusPill";
import { statusData } from "@/dummyData/reservationData";
import useReservationStore from "@/stores/reservation.store";
import { Pressable, StyleSheet, Text } from "react-native";

import { View } from "react-native";

const StatusBar = () => {
  const { setStatus } = useReservationStore();
  return (
    <View style={statusBarStyles.statusBar}>
      {statusData.map((status) => (
        <Pressable
          key={status.status}
          style={statusBarStyles.statusButton}
          onPress={() => {
            setStatus(status.status);
          }}
        >
          <Text>{status.status}</Text>
          <StatusPill status={status.status} />
        </Pressable>
      ))}
    </View>
  );
};

const statusBarStyles = StyleSheet.create({
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  statusButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
    marginHorizontal: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
});

export default StatusBar;
