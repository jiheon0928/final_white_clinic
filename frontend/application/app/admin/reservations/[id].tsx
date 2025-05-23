import { View, Text, StyleSheet, ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Page from "@/components/common/Page";
import BackBtnHeader from "@/components/common/header/BackBtnHeader";
import Info from "@/components/common/text/Info";
import { reservationDummy } from "@/dummyData/reservationData";
import MemoBox from "@/components/common/text/MemoBox";
import DefaultBtn from "@/components/common/button/DefualtBtn";
const ReservationDetail = () => {
  const { id } = useLocalSearchParams();
  const reservation = reservationDummy.find((v) => v.id == Number(id));
  return (
    <Page>
      <BackBtnHeader title="상세 페이지" />
      <ScrollView>
        <View style={styles.card}>
          <Text style={styles.clientInfo}>고객 정보</Text>
          <Info value={reservation?.고객이름 ?? ""} category="고객명" />
          <Info value={reservation?.연락처 ?? ""} category="연락처" />
          <Info value={reservation?.등록시간 ?? ""} category="예약 날짜" />
          <Info value={reservation?.예약날짜 ?? ""} category="방문 날짜" />
          <Info value={reservation?.등록시간 ?? ""} category="방문 시간" />
          <Info value={reservation?.주소 ?? ""} category="주소" />
          <Info value={reservation?.단가 ?? ""} category="가격" />
          <MemoBox
            title="고객 요청사항"
            value={"예약등록페이지에서 받아오던지말던지"}
          />
          <MemoBox
            title="기사님 전달 사항"
            value={"예약등록페이지에서 받아오던지해야할듯?"}
          />
          <Text style={styles.clientInfo}>기사 정보</Text>
          <Info value={"김민규"} category="기사 이름" />
          <Info value={"123-1234-1234"} category="전화번호" />
          <Info
            value={"강남구어쩌고저쩌고 아파트 101동101호"}
            category="주소"
          />
          <Info value={"40%"} category="수수료" />
          <DefaultBtn
            text="수정"
            onPress={() => {
              router.push(`/admin/reservations/edit/${id}`);
            }}
          />
        </View>
      </ScrollView>
    </Page>
  );
};
const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 16,
    padding: 18,
    marginTop: 18,
    gap: 10,
  },
  clientInfo: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
});
export default ReservationDetail;
