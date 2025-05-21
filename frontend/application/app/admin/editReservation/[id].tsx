import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const EditReservationScreen = () => {
  const [name, setName] = useState("홍길동");
  const [phone, setPhone] = useState("010-1234-5678");
  const [zonecode, setZonecode] = useState("12345");
  const [roadAddress, setRoadAddress] = useState("인천광역시 남동구 지원로 38");
  const [detailAddress, setDetailAddress] = useState("물닭 아파트 5동 1001호");
  const [request, setRequest] = useState(
    "급경사에 부탁드립니다. 강아지가 집에 있어서 벨 누르지말고 도착하시면 전화주세요."
  );
  const [visitDate, setVisitDate] = useState(new Date());
  const [visitTime, setVisitTime] = useState("13:30");
  const [price, setPrice] = useState("100000000");
  const { address2, zipcode2 } = useLocalSearchParams();
  const [addressField, setAddressField] = useState(
    typeof address2 === "string" ? address2 : ""
  );

  const [items, setItems] = useState({
    washer: false,
    aircon: false,
  });
  const clickAddress = () => {
    router.replace("/signup/addressapi");
  };
  const handleUpdate = () => {
    Alert.alert("수정 완료", "예약 정보가 수정되었습니다.");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>예약수정</Text>
      <View style={styles.card}>
        <LabelInput label="고객명" value={name} onChangeText={setName} />
        <LabelInput label="연락처" value={phone} onChangeText={setPhone} />

        <Text style={styles.label}>주소</Text>
        <View style={styles.zipRow}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            value={zonecode}
            onChangeText={setZonecode}
          />
          <TouchableOpacity onPress={clickAddress} style={styles.zipButton}>
            <Text style={styles.zipButtonText}>우편번호찾기</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          value={addressField}
          onChangeText={setAddressField}
        />
        <TextInput
          style={styles.input}
          value={detailAddress}
          onChangeText={setDetailAddress}
        />

        <LabelTextarea
          label="고객 요청 사항"
          value={request}
          onChangeText={setRequest}
        />

        <Text style={styles.sectionTitle}>가능 품목 리스트</Text>
        <View style={styles.checkboxRow}>
          <CheckBox
            label="세탁기"
            value={items.washer}
            onValueChange={(v: boolean) => setItems({ ...items, washer: v })}
          />
          <CheckBox
            label="에어컨"
            value={items.aircon}
            onValueChange={(v: boolean) => setItems({ ...items, aircon: v })}
          />
        </View>

        <View style={styles.row}>
          <LabelDate
            label="방문 날짜"
            value={visitDate}
            onChange={setVisitDate}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <LabelInput
              label="방문 시간"
              value={visitTime}
              onChangeText={setVisitTime}
            />
          </View>
        </View>

        <Text style={styles.label}>가격</Text>
        <View style={styles.priceRow}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />
          <Text style={{ marginLeft: 8, alignSelf: "center" }}>원</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>확인</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// 📌 기본 인풋
const LabelInput = ({ label, ...props }: any) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={styles.input} {...props} />
  </View>
);

// 📌 멀티라인 입력
const LabelTextarea = ({ label, ...props }: any) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, { height: 100, textAlignVertical: "top" }]}
      multiline
      numberOfLines={4}
      {...props}
    />
  </View>
);

// 📌 날짜 선택
const LabelDate = ({ label, value, onChange }: any) => {
  const [show, setShow] = useState(false);

  const formatDateToKorean = (date: Date) => {
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  };

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={() => setShow(true)}>
        <TextInput
          style={styles.input}
          value={formatDateToKorean(value)}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={value}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(_, selectedDate) => {
            setShow(false);
            if (selectedDate) onChange(selectedDate);
          }}
        />
      )}
    </View>
  );
};

// ✅ 체크박스 (커스텀)
const CheckBox = ({ label, value, onValueChange }: any) => (
  <TouchableOpacity
    style={styles.checkboxItem}
    onPress={() => onValueChange(!value)}
    activeOpacity={0.8}
  >
    <View style={styles.checkboxBox}>
      {value && <Text style={styles.checkmark}>✔</Text>}
    </View>
    <Text style={styles.checkboxLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 16,
    padding: 16,
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,

    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  zipRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  zipButton: {
    marginLeft: 10,
    marginBottom: 10,
    backgroundColor: "#eee",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
  },
  zipButtonText: {
    fontSize: 13,
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: 14,
    marginVertical: 12,
  },
  checkboxRow: {
    flexDirection: "row",

    marginBottom: 16,
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    borderRadius: 4,
  },
  checkmark: {
    fontSize: 14,
    color: "#00aaff",
  },
  checkboxLabel: {
    fontSize: 14,
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#00aaff",
    padding: 14,
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default EditReservationScreen;
