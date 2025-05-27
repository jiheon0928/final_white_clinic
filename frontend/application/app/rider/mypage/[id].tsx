import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// import DateTimePickerModal from "react-native-modal-datetime-picker";

const mypageDetail = () => {
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [showDate, setShowDate] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [detail, setDetail] = useState("");
  const [itemWasher, setItemWasher] = useState(false);
  const [itemAircon, setItemAircon] = useState(false);
  const { address2, zipcode2 } = useLocalSearchParams();

  const [addressField, setAddressField] = useState(
    typeof address2 === "string" ? address2 : ""
  );
  const [zipcodeField, setZipcodeField] = useState(
    typeof zipcode2 === "string" ? zipcode2 : ""
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="#222" />
      </TouchableOpacity>
      <Text style={styles.title}>정보 수정</Text>
      <Text style={styles.label}>이름</Text>
      <TextInput
        style={styles.input}
        placeholder="이름"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>전화번호</Text>
      <TextInput
        style={styles.input}
        placeholder="전화번호"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <Text style={styles.label}>이메일</Text>
      <TextInput
        style={styles.input}
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Text style={styles.label}>생년월일</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="생년월일"
          value={birth}
          editable={false}
        />
        <TouchableOpacity
          onPress={() => setShowDate(true)}
          style={styles.iconBtn}
        >
          <Ionicons name="calendar-outline" size={22} color="#222" />
        </TouchableOpacity>
      </View>
      {/* <DateTimePickerModal
        isVisible={showDate}
        mode="date"
        onConfirm={onChangeDate}
        onCancel={() => setShowDate(false)}
        date={birth ? new Date(birth) : new Date()}
      /> */}

      <Text style={styles.label}>주소</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="우편번호"
          value={zipcodeField}
          onChangeText={setZipcodeField}
        />
        <TouchableOpacity style={styles.zipBtn}>
          <Text onPress={clickAddress} style={styles.zipBtnText}>
            우편번호찾기
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="도로명 주소"
        value={addressField}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="상세주소"
        value={detail}
        onChangeText={setDetail}
      />

      <Text style={styles.label}>가능 품목 리스트</Text>
      <View style={styles.checkboxRow}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setItemWasher((v) => !v)}
        >
          <View
            style={[styles.checkBoxSquare, itemWasher && styles.checkedBox]}
          >
            {itemWasher && <Ionicons name="checkmark" size={16} color="#222" />}
          </View>
          <Text style={styles.checkLabel}>세탁기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setItemAircon((v) => !v)}
        >
          <View
            style={[styles.checkBoxSquare, itemAircon && styles.checkedBox]}
          >
            {itemAircon && <Ionicons name="checkmark" size={16} color="#222" />}
          </View>
          <Text style={styles.checkLabel}>에어컨</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.submitBtn}
        onPress={() => router.replace("/rider/(tabs)/myPage")}
      >
        <Text style={styles.submitBtnText}>완료</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  backBtn: {
    position: "absolute",
    top: 36,
    left: 16,
    zIndex: 10,
    padding: 4,
    paddingTop: 28,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 18,
    paddingTop: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 15,
    backgroundColor: "#fff",
    width: "100%",
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  iconBtn: {
    marginLeft: -36,
    padding: 8,
    zIndex: 1,
  },
  label: {
    fontSize: 15,
    marginBottom: 6,
    color: "#222",
    alignSelf: "flex-start",
    marginTop: 6,
  },
  zipBtn: {
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 8,
  },
  zipBtnText: {
    color: "#222",
    fontSize: 13,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    width: "100%",
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  checkBoxSquare: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 4,
    marginRight: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  checkedBox: {
    borderColor: "#6DD6FF",
    backgroundColor: "#e6f7ff",
  },
  checkLabel: {
    fontSize: 15,
    color: "#222",
  },
  submitBtn: {
    backgroundColor: "#6DD6FF",
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  submitBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default mypageDetail;
