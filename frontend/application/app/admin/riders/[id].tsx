import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { useMemo, useState } from "react";
import { riderDummy } from "@/dummyData/riderData";
import Page from "@/components/common/Page";
import BackBtnHeader from "@/components/common/header/BackBtnHeader";
import Info from "@/components/common/text/Info";
import DefaultBtn from "@/components/common/button/DefualtBtn";
const RiderDetail = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const rider = useMemo(
    () => riderDummy.find((r) => r.id === Number(id)),
    [id]
  );
  const [memo, setMemo] = useState("");
  return (
    <Page>
      <BackBtnHeader title="기사 상세 정보" />
      <View style={styles.card}>
        <Info category="이름" value={rider?.name || ""} />
        <Info category="생년월일" value={rider?.birth || ""} />
        <Info category="연락처" value={rider?.phone || ""} />
        <Info category="주소" value={rider?.address || ""} />
        <Info category="이메일" value={rider?.email || ""} />
        <Text style={[styles.infoText, { marginTop: 10 }]}>
          가능 품목 리스트
        </Text>
        {rider?.items.map((item, index) => (
          <Text key={index}>
            {index + 1}. {item}
          </Text>
        ))}
        <Text style={[styles.infoText, styles.infoTextBold]}>관리자 메모</Text>
        <View style={styles.requestBox}>
          <Text style={{ color: "#333", fontSize: 14 }}>{memo}</Text>
        </View>
        <DefaultBtn
          text="수정"
          onPress={() => {
            router.push(`/admin/riders/edit/${id}`);
          }}
        />
      </View>
    </Page>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  requestBox: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    marginBottom: 8,
  },
  backBtn: {
    position: "absolute",
    left: 10,
    top: 18,
    zIndex: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginVertical: 18,
  },
  card: {
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 16,
    padding: 18,
    marginTop: 18,
    gap: 10,
  },
  infoText: {
    fontSize: 15,
    marginBottom: 4,
  },
  infoTextBold: {
    fontWeight: "bold",
  },
  checkboxRow: {
    flexDirection: "row",
    gap: 16,
    marginVertical: 6,
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 4,
    marginRight: 6,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxLabel: {
    fontSize: 15,
  },
  memoInput: {
    borderWidth: 1,
    height: 80,
    borderRadius: 10,
    marginTop: 6,
    marginBottom: 16,
    padding: 10,
    color: "#000",
    fontSize: 15,
    textAlignVertical: "top",
    borderColor: "#888",
  },
  editBtn: {
    backgroundColor: "#6DD3FF",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  editBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default RiderDetail;
