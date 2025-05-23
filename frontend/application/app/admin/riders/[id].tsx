import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { riderDummy } from "@/dummyData/riderData";
import Page from "@/components/common/Page";
import BackBtnHeader from "@/components/common/header/BackBtnHeader";
import Info from "@/components/common/text/Info";
import CheckBoxBundle from "@/components/common/input/CheckBoxBundle";
import Input from "@/components/common/input/Input";
import DefaultBtn from "@/components/common/button/DefualtBtn";

const RiderDetail = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const rider = useMemo(
    () => riderDummy.find((r) => r.id === Number(id)),
    [id]
  );

  const [memo, setMemo] = useState("");
  const [checkedItems, setCheckedItems] = useState({
    washer: false,
    aircon: false,
  });

  const toggleCheckbox = (item: "washer" | "aircon") => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  return (
    <Page>
      <BackBtnHeader title="기사 상세 정보" />
      <View style={styles.card}>
        <Info category="이름" value={rider?.name || ""} />
        <Info category="생년월일" value={rider?.birth || ""} />
        <Info category="연락처" value={rider?.phone || ""} />
        <Info category="주소" value={rider?.address || ""} />
        <Info category="이메일" value={rider?.email || ""} />
        <Text style={[styles.infoText, { marginTop: 10 }]}>품목 리스트</Text>
        <CheckBoxBundle
          ACvalue={checkedItems.aircon}
          onValueChangAC={() => toggleCheckbox("aircon")}
          WSvalue={checkedItems.washer}
          onValueChangeWS={() => toggleCheckbox("washer")}
        />
        <Input title="관리자 메모" onChangeText={setMemo} />
        <DefaultBtn
          text="수정"
          onPress={() => {
            router.push("/admin/riders/[id]/edit");
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
  },
  infoText: {
    fontSize: 15,
    marginBottom: 4,
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
