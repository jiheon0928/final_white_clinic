import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const WaitingDetail = () => {
  const { id } = useLocalSearchParams();

  // 더미 데이터
  const detail = {
    title: "에어컨",
    customer: "김민규",
    phone: "010-1234-1234",
    reserveDate: "2025-05-05",
    address: "서울특별시 서초구 서초대로 12\n서초아파트 101동 101호",
    price: "100,000원",
    request:
      "꼼꼼하게 부탁 드립니다. 강아지가 집에 있어서 벨누르지말고 도착하시면 전화주세요.",
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="#222" />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            textAlign: "center",
            marginVertical: 16,
          }}
        >
          상세 페이지
        </Text>
        <View style={styles.box}>
          <Text style={styles.label}>
            제목 : <Text style={styles.value}>{detail.title}</Text>
          </Text>
          <Text style={styles.label}>
            고객명 : <Text style={styles.value}>{detail.customer}</Text>
          </Text>
          <Text style={styles.label}>
            전화번호 : <Text style={styles.value}>{detail.phone}</Text>
          </Text>
          <Text style={styles.label}>
            예약 날짜 : <Text style={styles.value}>{detail.reserveDate}</Text>
          </Text>
          <Text style={styles.label}>완료 날짜 :</Text>
          <Text style={styles.label}>
            주소 : <Text style={styles.value}>{detail.address}</Text>
          </Text>
          <Text style={styles.label}>
            가격 : <Text style={styles.value}>{detail.price}</Text>
          </Text>
          <Text style={styles.label}>고객 요청 사항</Text>
          <View style={styles.requestBox}>
            <Text style={{ color: "#333", fontSize: 14 }}>
              {detail.request}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>수락</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    color: "#222",
    marginBottom: 4,
  },
  value: {
    fontWeight: "400",
    color: "#444",
  },
  backBtn: {
    position: "absolute",
    top: 36,
    left: 16,
    zIndex: 10,
    padding: 4,
    paddingTop: 28,
  },
  requestBox: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#6DD6FF",
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 32,
    alignItems: "center",
    marginBottom: 32,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default WaitingDetail;
