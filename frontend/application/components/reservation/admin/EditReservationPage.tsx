import CheckBoxBundle from "@/components/common/input/CheckBoxBundle";
import DateTimeInput from "@/components/common/input/DateTimeInput";
import DefaultBtn from "@/components/common/button/DefualtBtn";
import Input from "@/components/common/input/Input";
import Page from "@/components/common/Page";
import styles from "@/styles/EditReservation/EditReservationStyle";
import React, { useState } from "react";
import { Alert, ScrollView, Text, TextInput, View } from "react-native";
import BackBtnHeader from "@/components/common/header/BackBtnHeader";
import { router } from "expo-router";
import AddressInput from "@/components/common/input/AddressInput";

const EditReservationPage = () => {
  const [items, setItems] = useState({
    washer: false,
    aircon: true,
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const handleUpdate = () => {
    Alert.alert("수정 완료", "예약 정보가 수정되었습니다.");
    router.back();
  };

  return (
    <Page>
      <BackBtnHeader title="예약수정" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Input title={"고객명"} numberOfLines={1} />
          <Input title={"연락처"} numberOfLines={1} />
          <AddressInput />

          <Input title={"고객 요청 사항"} numberOfLines={2} />
          <Text style={styles.sectionTitle}>가능 품목 리스트</Text>
          <CheckBoxBundle
            ACvalue={items.aircon}
            onValueChangAC={(val) => setItems({ ...items, aircon: val })}
            WSvalue={items.washer}
            onValueChangeWS={(val) => setItems({ ...items, washer: val })}
          />

          <DateTimeInput
            date={selectedDate}
            showDate={showDate}
            showTime={showTime}
            setShowDate={setShowDate}
            setShowTime={setShowTime}
            onChangeDate={setSelectedDate}
          />

          <Input title={"기사님 전달 사항"} numberOfLines={4} />

          <Text style={styles.subtitle}>가격</Text>
          <View style={styles.priceRow}>
            <TextInput
              style={styles.priceInput}
              placeholder="가격 입력"
              onChangeText={() => {}}
            />
            <Text style={styles.wonmargin}>원</Text>
          </View>
          <DefaultBtn text={"완료"} onPress={handleUpdate} />
        </View>
      </ScrollView>
    </Page>
  );
};

export default EditReservationPage;
