import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const reservationStatus = ["대기", "진행", "완료", "예약 수정"];
const Reservations = () => {
  return (
    <View style={styles.wrapper}>
      {reservationStatus.map((status) => (
        <TouchableOpacity
          key={status}
          onPress={() => router.push(`/admin/reservations/${status}`)}
          style={styles.container}
        >
          <Text style={styles.content}>{status}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    height: 100,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#51cdff",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default Reservations;
