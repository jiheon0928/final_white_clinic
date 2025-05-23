import Info from "@/components/common/text/Info";
import DefaultBtn from "@/components/common/button/DefualtBtn";
import { StyleSheet, Text, View } from "react-native";
import Page from "@/components/common/Page";
import { waitingDetail } from "@/dummyData/waitingData";

const WaitingDetail = () => {
  return (
    //헤더 추가하자
    <Page>
      <View style={styles.box}>
        <Info value={waitingDetail.title} category="제목" />
        <Info value={waitingDetail.customer} category="고객명" />
        <Info value={waitingDetail.phone} category="전화번호" />
        <Info value={waitingDetail.reserveDate} category="예약 날짜" />
        <Info value={waitingDetail.address} category="주소" />
        <Info value={waitingDetail.price} category="가격" />
        <Text style={styles.label}>고객 요청 사항</Text>
        <View style={styles.requestBox}>
          <Text style={{ color: "#333", fontSize: 14 }}>
            {waitingDetail.request}
          </Text>
        </View>
      </View>
      <DefaultBtn onPress={() => {}} text="수락" />
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
