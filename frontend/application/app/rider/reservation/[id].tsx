import DefaultBtn from "@/components/common/button/DefualtBtn";
import Info from "@/components/common/text/Info";
import Page from "@/components/common/Page";
import { reservationDetail } from "@/dummyData/completedDate";
import { StyleSheet, Text, View } from "react-native";
import BackBtnHeader from "@/components/common/header/BackBtnHeader";

const ReservationDetail = () => {
  const btnText = (status: string) => {
    if (status == "대기") {
      return "수락";
    } else if (status == "진행") {
      return "완료";
    } else {
      return "리뷰 보기";
    }
  };
  return (
    <Page>
      <BackBtnHeader title="예약 상세" />
      <View style={styles.box}>
        <Info value={reservationDetail.title} category="제목" />
        <Info value={reservationDetail.customer} category="고객명" />
        <Info value={reservationDetail.phone} category="전화번호" />
        <Info value={reservationDetail.reserveDate} category="예약 날짜" />
        <Info value={reservationDetail.completedDate} category="완료 날짜" />
        <Info value={reservationDetail.address} category="주소" />
        <Info value={reservationDetail.price} category="가격" />
        <Text style={styles.label}>고객 요청 사항</Text>
        <View style={styles.requestBox}>
          <Text style={{ color: "#333", fontSize: 14 }}>
            {reservationDetail.request}
          </Text>
        </View>
      </View>
      <DefaultBtn onPress={() => {}} text={btnText(reservationDetail.status)} />
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
