import DefaultBtn from "@/components/common/button/DefualtBtn";
import Info from "@/components/common/text/Info";
import Page from "@/components/common/Page";
import { StyleSheet, Text, View } from "react-native";
import BackBtnHeader from "@/components/common/header/BackBtnHeader";
import { reservationDummy } from "@/dummyData/reservationData";
type ReservationDetailProps = {
  id: number;
};
const ReservationDetail = ({ id }: ReservationDetailProps) => {
  const reservation = reservationDummy.find((v) => v.id == Number(id));
  const btnText = (status: string) => {
    if (status == "대기") {
      return "수락";
    } else if (status == "진행") {
      return "완료";
    } else {
      return "리뷰 보기";
    }
  };
  const completedDate = () => {
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
      <BackBtnHeader title="예약 상세" />
      <View style={styles.box}>
        <Info value={reservation?.제목 ?? ""} category="제목" />
        <Info value={reservation?.고객이름 ?? ""} category="고객명" />
        <Info value={reservation?.연락처 ?? ""} category="전화번호" />
        <Info value={reservation?.예약날짜 ?? ""} category="예약 날짜" />
        <Info value={completedDate() ?? ""} category="완료 날짜" />
        <Info value={reservation?.주소 ?? ""} category="주소" />
        <Info value={reservation?.단가 ?? ""} category="가격" />
        <Text style={styles.label}>고객 요청 사항</Text>
        <View style={styles.requestBox}>
          <Text style={{ color: "#333", fontSize: 14 }}>
            {reservation?.고객요청 ?? ""}
          </Text>
        </View>
      </View>
      <DefaultBtn onPress={() => {}} text={btnText(reservation?.상태 ?? "")} />
    </Page>
  );
};

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 16,
    padding: 16,
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

export default ReservationDetail;
