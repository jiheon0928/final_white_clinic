import StatusPill from "@/components/common/StatusPill";
import { statusData } from "@/dummyData/reservationData";
import useReservationStore from "@/stores/reservation.store";
import { statusBarStyles } from "@/styles/status/statusBarStyle";
import { Pressable, Text, View } from "react-native";
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
export default StatusBar;
