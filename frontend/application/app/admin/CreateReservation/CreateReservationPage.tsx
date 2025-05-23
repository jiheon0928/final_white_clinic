import Address from "@/components/common/AddressInput";
import CheckBoxBundle from "@/components/common/CheckBoxBundle";
import DateTimeInput from "@/components/common/DateTimeInput";
import DefaultBtn from "@/components/common/DefualtBtn";
import BackBtnHeader from "@/components/common/header/BackBtnHeader";
import Input from "@/components/common/Input";
import Page from "@/components/common/Page";
import styles from "@/styles/EditReservation/EditReservationStyle";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, Text, TextInput, View } from "react-native";
const CreateReservationPage = () => {
  const [items, setItems] = useState({
    washer: false,
    aircon: true,
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const handleUpdate = () => {
    Alert.alert("등록 완료", "예약이 등록되었습니다..");
    router.back();
  };
  return (
    <Page>
      <ScrollView>
        <BackBtnHeader title="예약등록" />
        <Input title={"고객명"} numberOfLines={1} />
        <Input title={"연락처"} numberOfLines={1} />
        <Address
          zipCode={"1234"}
          address={"뭐함"}
          onAddressChange={() => {}}
          detailAddress={"테스트"}
          onDetailAddressChange={() => {}}
        />
        <Input title={"고객 요청 사항"} numberOfLines={4} />
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
        <DefaultBtn text={"확인"} onPress={handleUpdate} />
      </ScrollView>
    </Page>
  );
};

export default CreateReservationPage;
