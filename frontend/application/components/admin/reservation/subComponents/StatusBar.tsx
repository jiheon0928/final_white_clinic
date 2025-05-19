import StatusPill from "@/components/common/StatusPill";
import { status } from "@/dummyData/reservationData";
import { Pressable, StyleSheet, Text } from "react-native";

import { View } from "react-native";

const StatusBar = () => {
  return (
    <View style={statusBarStyles.statusBar}>
      {status.map((status) => (
        <Pressable
          key={status.status}
          style={statusBarStyles.statusButton}
          onPress={() => {}}
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
    marginBottom: 10,
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
