import StatusPill from "@/components/common/StatusPill";
import useReservationStore from "@/stores/reservation.store";
import { statusBarStyles } from "@/styles/status";
import { Pressable, Text, View } from "react-native";
const statusData = ["대기", "진행", "완료"];
const StatusBar = () => {
  const { setStatus } = useReservationStore();
  return (
    <View style={statusBarStyles.statusBar}>
      {statusData.map((status) => (
        <Pressable
          key={status}
          style={statusBarStyles.statusButton}
          onPress={() => {
            setStatus(status as "대기" | "진행" | "완료");
          }}
        >
          <Text>{status}</Text>
          <StatusPill status={status} />
        </Pressable>
      ))}
    </View>
  );
};
export default StatusBar;
