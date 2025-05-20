import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const pendingRiders = [
  {
    name: "장효환",
    phone: "010-1234-1234",
    birth: "1999-09-09",
    address: "인천광역시 부평구 부개로 임기아파트 101동 101호",
    email: "kmk99@naver.com",
    rate: "40%",
  },
  {
    name: "김민규",
    phone: "010-1234-1234",
    birth: "1999-09-09",
    address: "인천광역시 부평구 부개로 임기아파트 101동 101호",
    email: "kmk99@naver.com",
    rate: "40%",
  },
];
const pending = () => {
  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <Text style={styles.title}>인증 대기</Text>
      {pendingRiders.map((rider, idx) => (
        <View key={idx} style={styles.card}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.name}>{rider.name}</Text>
            <TouchableOpacity style={styles.approveBtn}>
              <Text style={styles.approveBtnText}>인증하기</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>
            연락처 : <Text style={styles.red}>{rider.phone}</Text>
          </Text>
          <Text style={styles.label}>생년월일 : {rider.birth}</Text>
          <Text style={styles.label}>주소 : {rider.address}</Text>
          <Text style={styles.label}>이메일 : {rider.email}</Text>
          <Text style={styles.label}>수수료 : {rider.rate}</Text>
        </View>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 18,
  },
  card: {
    borderWidth: 1,
    borderColor: "#222",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 18,
    backgroundColor: "#fff",
  },
  name: { fontSize: 17, fontWeight: "bold", marginBottom: 4 },
  label: { fontSize: 15, marginBottom: 2, color: "#222" },
  red: { color: "#ff4d4d", fontWeight: "bold" },
  approveBtn: {
    borderWidth: 1,
    borderColor: "#222",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#fff",
  },
  approveBtnText: { fontSize: 15, fontWeight: "bold" },
});

export default pending;
