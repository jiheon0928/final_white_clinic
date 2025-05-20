import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Title from "@/components/common/Title";
import SearchInput from "@/components/common/SearchInput";
import Card from "@/components/common/Card";

import { useRouter } from "expo-router";
import { riderDummy } from "@/dummyData/riderData";
const pendingCount = 2;
const Riders = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Title title="기사 현황" />
        <TouchableOpacity
          style={styles.pendingBtn}
          onPress={() => router.push("/admin/riders/pending/page")}
        >
          <Text style={styles.btnText}>승인대기</Text>
          {pendingCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{pendingCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <SearchInput placeholder="" />
      <ScrollView>
        {riderDummy.map((rider) => (
          <Card
            key={rider.id}
            btnName="상세정보"
            pressBtn={() =>
              router.push({
                pathname: "/admin/riders/[id]",
                params: { id: String(rider.id) },
              })
            }
          >
            <Text style={styles.riderName}>{rider.name}</Text>
            <Text style={styles.riderPhone}>
              연락처 : <Text style={styles.phoneRed}>{rider.phone}</Text>
            </Text>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  badgeText: { color: "#fff", fontWeight: "bold", fontSize: 13 },
  badge: {
    backgroundColor: "#ff4d4d",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    paddingHorizontal: 6,
  },
  btnText: { fontSize: 18, fontWeight: "bold" },
  pendingBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "#222",
    borderRadius: 8,
    marginBottom: 16,
    position: "relative",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  riderName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  riderPhone: {
    fontSize: 15,
    marginBottom: 2,
  },
  phoneRed: {
    color: "#FF3B30",
    fontWeight: "bold",
  },
});

export default Riders;
