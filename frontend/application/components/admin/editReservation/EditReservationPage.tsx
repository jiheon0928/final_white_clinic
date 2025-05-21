import Address from "@/components/common/Address";
import CheckBox from "@/components/common/CheckBox";
import DefaultBtn from "@/components/common/DefualtBtn";
import Input from "@/components/common/Input";
import Page from "@/components/common/Page";
import styles from "@/styles/EditReservation/EditReservationStyle";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const EditReservationPage = () => {
  const [name, setName] = useState("홍길동");
  const [phone, setPhone] = useState("010-1234-5678");
  const [zonecode, setZonecode] = useState("");
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

  const handleUpdate = () => {
    Alert.alert("수정 완료", "예약 정보가 수정되었습니다.");
  };

  return (
    <Page>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>예약수정</Text>

        <View style={styles.card}>
          <Input title={"고객명"} numberOfLines={1} />
          <Input title={"연락처"} numberOfLines={1} />
          <Address
            zipCode={"1234"}
            address={"뭐함"}
            onAddressChange={() => {}}
            detailAddress={"테스트"}
            onDetailAddressChange={() => {}}
          />

          <Input title={"고객 요청 사항"} numberOfLines={2} />
          <Text style={styles.sectionTitle}>가능 품목 리스트</Text>
          <View style={styles.checkboxRow}>
            <CheckBox
              label="세탁기"
              value={items.washer}
              onValueChange={(v: boolean) => setItems({ ...items, washer: v })}
            />
            <CheckBox
              label="에어컨"
              value={items.washer}
              onValueChange={(v: boolean) => setItems({ ...items, washer: v })}
            />
          </View>

          <Input title={"기사님 전달 사항"} numberOfLines={4} />
          <View style={styles.priceRow}>
            <Input title={"가격"} numberOfLines={1} />
            <Text style={styles.wonmargin}>원</Text>
          </View>
          <DefaultBtn text={"확인"} onPress={handleUpdate} />
        </View>
      </ScrollView>
    </Page>
  );
};

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

export default EditReservationPage;
