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
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={28} color="#222" />
      </TouchableOpacity>
      <Text style={styles.title}>기사 상세 정보</Text>
      <View style={styles.card}>
        <Text style={styles.infoText}>이름 : {rider?.name}</Text>
        <Text style={styles.infoText}>생년월일 : {rider?.birth}</Text>
        <Text style={styles.infoText}>연락처 : {rider?.phone}</Text>
        <Text style={styles.infoText}>주소 : {rider?.address}</Text>
        <Text style={styles.infoText}>이메일 : {rider?.email}</Text>
        <Text style={[styles.infoText, { marginTop: 10 }]}>품목 리스트</Text>
        <View style={styles.checkboxRow}>
          <TouchableOpacity
            style={styles.checkboxItem}
            onPress={() => toggleCheckbox("washer")}
          >
            <View style={styles.checkbox}>
              {checkedItems.washer && (
                <Ionicons name="checkmark" size={16} color="black" />
              )}
            </View>
            <Text style={styles.checkboxLabel}>세탁기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.checkboxItem}
            onPress={() => toggleCheckbox("aircon")}
          >
            <View style={styles.checkbox}>
              {checkedItems.aircon && (
                <Ionicons name="checkmark" size={16} color="black" />
              )}
            </View>
            <Text style={styles.checkboxLabel}>에어컨</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.infoText, { marginTop: 10 }]}>관리자 메모</Text>
        <TextInput
          style={styles.memoInput}
          multiline
          placeholder="메모를 입력하세요"
          placeholderTextColor="#888"
          value={memo}
          onChangeText={setMemo}
        />
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() =>
            router.push({
              pathname: "/admin/riders/[id]/edit",
              params: { id: Number(id) },
            })
          }
        >
          <Text style={styles.editBtnText}>수정</Text>
        </TouchableOpacity>
      </View>
    </View>
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
