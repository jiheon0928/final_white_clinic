import { View, Text, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Page from "@/components/common/Page";
import BackBtnHeader from "@/components/common/header/BackBtnHeader";
import Info from "@/components/common/text/Info";
import { reservationDummy } from "@/dummyData/reservationData";
import DefaultBtn from "@/components/common/button/DefualtBtn";
const ReservationDetail = () => {
  const { id } = useLocalSearchParams();
  const reservation = reservationDummy.find((v) => v.id == Number(id));
  const adminCompletedStatus = () => {
    if (reservation?.상태 == "대기" || reservation?.상태 == "진행") {
      return "수정";
    } else {
      return;
    }
  };
  const adminCompleted = () => {
    if (reservation?.상태 == "완료") {
      return reservation?.완료날짜;
    } else if (reservation?.상태 == "진행") {
      return "진행중";
    } else {
      return "대기중";
    }
  };

  return (
    <Page>
      <BackBtnHeader title="예약 상세 페이지" />
      <View style={ReservationDetailStyles.box}>
        <Info value={reservation?.제목 ?? ""} category="제목" />
        <Info value={reservation?.분야 ?? ""} category="분야" />
        <Info value={reservation?.고객이름 ?? ""} category="고객명" />
        <Info value={reservation?.연락처 ?? ""} category="연락처" />
        <Info value={reservation?.방문날짜 ?? ""} category="방문 날짜" />
        <Info value={reservation?.방문시간 ?? ""} category="방문 시간" />
        <Info value={adminCompleted() ?? ""} category="완료 날짜" />
        <Info value={reservation?.주소 ?? ""} category="주소" />
        <Info value={reservation?.단가 ?? ""} category="단가" />
        <Text style={ReservationDetailStyles.infoText}>고객 요청사항</Text>
        <View style={ReservationDetailStyles.requestBox}>
          <Text style={{ color: "#333", fontSize: 14 }}>
            {reservation?.고객요청 ?? ""}
          </Text>
        </View>
        <Text style={ReservationDetailStyles.infoText}>기사님 전달 사항</Text>
        <View style={ReservationDetailStyles.requestBox}>
          <Text style={{ color: "#333", fontSize: 14 }}>
            {reservation?.기사요청 ?? ""}
          </Text>
        </View>
      </View>
      {reservation?.상태 !== "완료" && (
        <DefaultBtn
          text={adminCompletedStatus() ?? ""}
          onPress={() => {
            router.push(`/admin/reservations/edit/${id}`);
          }}
        />
      )}
    </Page>
  );
};
const ReservationDetailStyles = StyleSheet.create({
  requestBox: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    marginBottom: 8,
  },
  box: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 24,
    gap: 8,
  },
  infoText: {
    fontSize: 15,
    marginBottom: 4,
    fontWeight: "bold",
  },
});
export default ReservationDetail;
