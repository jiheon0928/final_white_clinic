import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Page from "@/components/common/Page";
import DefaultHeader from "@/components/common/header/DefaultHeader";
import BackBtnHeader from "@/components/common/header/BackBtnHeader";
import Info from "@/components/common/Info";
import { reservationDummy } from "@/dummyData/reservationData";
const ReservationDetail = () => {
  const { id } = useLocalSearchParams();
  const reservation = reservationDummy.find((v) => v.id == Number(id));
  return (
    <Page>
      <BackBtnHeader title="상세 페이지" />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>고객 정보</Text>
      <Info value={reservation?.고객이름 ?? ""} category="고객명" />
      <Info value={reservation?.연락처 ?? ""} category="연락처" />
      <Info value={reservation?.등록시간 ?? ""} category="예약 날짜" />
      <Info value={reservation?.예약날짜 ?? ""} category="방문 날짜" />
      <Info value={reservation?.등록시간 ?? ""} category="방문 시간" />
      <Info value={reservation?.주소 ?? ""} category="주소" />
      <Info value={reservation?.단가 ?? ""} category="단가" />
      <Text>고객 요청사항</Text>
      <View style={styles.requestBox}>
        <Text style={{ color: "#333", fontSize: 14 }}>
          {reservation?.고객요청 ?? ""}
        </Text>
      </View>
      <Text>기사님 전달 사항</Text>
      <View style={styles.requestBox}>
        <Text style={{ color: "#333", fontSize: 14 }}>
          {reservation?.고객요청 ?? ""}
        </Text>
      </View>
    </Page>
  );
};
const styles = StyleSheet.create({
  requestBox: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    marginBottom: 8,
  },
});
export default ReservationDetail;
