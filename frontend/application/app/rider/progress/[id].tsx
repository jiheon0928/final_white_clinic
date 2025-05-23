import { StyleSheet, Text, View } from "react-native";
import { progressDetail } from "@/dummyData/progressData";
import Page from "@/components/common/Page";
import Info from "@/components/common/text/Info";
import DefaultBtn from "@/components/common/button/DefualtBtn";

const ProgressDetail = () => {
  return (
    //헤더 추가하자
    <Page>
      <View style={styles.box}>
        <Info value={progressDetail.title} category="제목" />
        <Info value={progressDetail.customer} category="고객명" />
        <Info value={progressDetail.phone} category="전화번호" />
        <Info value={progressDetail.reserveDate} category="예약 날짜" />
        <Info value={progressDetail.progressDate} category="진행 날짜" />
        <Info value={progressDetail.address} category="주소" />
        <Info value={progressDetail.price} category="가격" />
        <Text style={styles.label}>고객 요청 사항</Text>
        <View style={styles.requestBox}>
          <Text style={{ color: "#333", fontSize: 14 }}>
            {progressDetail.request}
          </Text>
        </View>
      </View>
      <DefaultBtn onPress={() => {}} text="완료" />
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

export default ProgressDetail;
