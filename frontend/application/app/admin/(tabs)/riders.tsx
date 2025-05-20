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

const Riders = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Title title="기사 현황" />
        <TouchableOpacity style={styles.waitingBtn}>
          <Text style={styles.waitingBtnText}>승인대기(9)</Text>
        </TouchableOpacity>
      </View>
      <SearchInput placeholder="" onChangeText={() => {}} />
      <ScrollView>
        {riderDummy.map((rider) => (
          <Card
            key={rider.id}
            btnName="상세정보"
            pressBtn={() =>
              router.push({
                pathname: "/admin/riders",
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
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  waitingBtn: {
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  waitingBtnText: {
    fontSize: 16,
    color: "#222",
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
