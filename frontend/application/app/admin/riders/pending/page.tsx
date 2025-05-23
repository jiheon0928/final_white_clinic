import { View, Text, StyleSheet, ScrollView } from "react-native";
import pendingRiders from "@/dummyData/pendingData";
import Page from "@/components/common/Page";
import Info from "@/components/common/text/Info";
import Card from "@/components/common/box/Card";

const pending = () => {
  return (
    <Page>
      <ScrollView style={{ backgroundColor: "#fff" }}>
        <Text style={styles.title}>인증 대기</Text>
        {pendingRiders.map((rider, idx) => (
          <Card key={idx} btnName="인증하기" pressBtn={() => {}}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.name}>{rider.name}</Text>
            </View>
            <Info value={rider.phone} category="연락처" />
            <Info value={rider.birth} category="생년월일" />
            <Info value={rider.address} category="주소" />
            <Info value={rider.email} category="이메일" />
            <Info value={rider.rate} category="수수료" />
          </Card>
        ))}
      </ScrollView>
    </Page>
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
