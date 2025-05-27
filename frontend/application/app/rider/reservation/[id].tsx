import DefaultBtn from "@/components/common/button/DefualtBtn";
import Info from "@/components/common/text/Info";
import Page from "@/components/common/Page";
import { StyleSheet, Text, View } from "react-native";
import BackBtnHeader from "@/components/common/header/BackBtnHeader";
import { reservationDummy } from "@/dummyData/reservationData";
import { router, useLocalSearchParams } from "expo-router";

const ReservationDetail = () => {
  const { id } = useLocalSearchParams();
  const reservation = reservationDummy.find((v) => v.id == Number(id));
  const btnText = (status: string) => {
    if (status == "대기") {
      return "수락";
    } else if (status == "진행") {
      return "완료";
    } else {
      return "확인";
    }
  };
  const completedDate = () => {
    if (reservation?.상태 == "완료") {
      return reservation?.완료날짜;
    } else if (reservation?.상태 == "진행") {
      return "진행중";
    } else {
      return;
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
        <Info value={completedDate() ?? ""} category="완료 날짜" />
        <Info value={reservation?.주소 ?? ""} category="주소" />
        <Info value={reservation?.단가 ?? ""} category="단가" />
        <Text style={ReservationDetailStyles.label}>고객 요청 사항</Text>
        <View style={ReservationDetailStyles.requestBox}>
          <Text style={{ color: "#333", fontSize: 14 }}>
            {reservation?.고객요청 ?? ""}
          </Text>
        </View>
        <Text style={ReservationDetailStyles.label}>기사 요청 사항</Text>
        <View style={ReservationDetailStyles.requestBox}>
          <Text style={{ color: "#333", fontSize: 14 }}>
            {reservation?.기사요청 ?? ""}
          </Text>
        </View>
      </View>
      {reservation?.상태 !== "완료" && (
        <DefaultBtn
          onPress={() => {
            router.back();
          }}
          text={btnText(reservation?.상태 ?? "")}
        />
      )}
    </Page>
  );
};

const ReservationDetailStyles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 24,
    gap: 8,
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
    marginBottom: 4,
    fontWeight: "bold",
  },
  value: {
    fontWeight: "400",
    color: "#444",
  },
  requestBox: {
    borderWidth: 1,
    borderColor: "#333",
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

export default ReservationDetail;
