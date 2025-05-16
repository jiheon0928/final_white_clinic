import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CompletedDetail() {
  const { id } = useLocalSearchParams();

  // 더미 데이터
  const detail = {
    title: "에어컨 청소",
    customer: "이수민",
    phone: "010-9999-8888",
    completedDate: "2025-06-10",
    address: "서울특별시 강남구",
    price: "100,000원",
    request: "완료된 서비스입니다.",
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#222" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            textAlign: "center",
            marginVertical: 16,
          }}
        >
          완료 상세 페이지
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
            완료 날짜 : <Text style={styles.value}>{detail.completedDate}</Text>
          </Text>
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
          <Text style={styles.buttonText}>리뷰 보기</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

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
  backBtn: {
    position: "absolute",
    top: 36,
    left: 16,
    zIndex: 10,
    padding: 4,
    paddingTop: 28,
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
