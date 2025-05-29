import DefaultBtn from "@/components/common/button/DefualtBtn";
import Input from "@/components/common/input/Input";
import Page from "@/components/common/Page";
import BackBtnHeader from "@/components/common/header/BackBtnHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TimeInput from "@/components/common/input/TimeInput";
import { View, Text, Platform, ScrollView, Switch } from "react-native";
import CalenderInput from "@/components/common/input/CalenderInput";

import useTimeStore from "@/stores/time.store";
import useDateStore from "@/stores/date.store";
import { router } from "expo-router";
import { combineDateAndTime } from "../../../hooks/format";
import AddressInput from "@/components/common/input/AddressInput";
import useAddressStore from "@/stores/address.store";
import useReservationStore from "@/stores/reservation.store";
import useIndustryStore from "@/stores/industry.store";
import { useState } from "react";
import IndustryToggle from "@/components/common/input/IndustyToggle";
import { createReservation } from "@/utils/reservationService";

const ReservationHandler = ({ id, title }: { id?: string; title: string }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const insets = useSafeAreaInsets();
  const { reservation, setReservationField, resetReservation } =
    useReservationStore();
  const { date, resetDate } = useDateStore();
  const { time, resetTime } = useTimeStore();
  const { zipcode, address, detailAddress, resetAddress } = useAddressStore();

  const handleSubmit = async () => {
    setReservationField("visitTime", combineDateAndTime(date, time));
    setReservationField("zipCode", zipcode);
    setReservationField("address", address);
    setReservationField("detailAddress", detailAddress);
    const result = useReservationStore.getState().reservation;
    console.log("제출 데이터:", result);
    await createReservation(result);
    resetReservation();
    resetDate();
    resetTime();
    resetAddress();
    router.back();
  };

  const editReservationInputFields = [
    { title: "예약명", key: "reservationName", numberOfLines: 1 },
    { title: "고객명", key: "customerName", numberOfLines: 1 },
    { title: "연락처", key: "customerPhone", numberOfLines: 1 },
    { title: "고객 요청 사항", key: "customerRequest", numberOfLines: 4 },
  ] as const;

  return (
    <Page>
      <BackBtnHeader title={title} />
      <ScrollView>
        <View
          style={{
            paddingBottom:
              insets.bottom + 20 || (Platform.OS === "android" ? 20 : 0),
            gap: 10,
          }}
        >
          {editReservationInputFields.map(({ title, key, numberOfLines }) => (
            <Input
              key={key}
              title={title}
              value={reservation[key]}
              numberOfLines={numberOfLines}
              onChangeText={(text) => setReservationField(key, text)}
            />
          ))}
          <AddressInput />
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={{ flex: 1 }}>
              <CalenderInput title="예약 날짜" />
            </View>
            <View style={{ flex: 1 }}>
              <TimeInput />
            </View>
          </View>

          <Input
            title={"기사님 전달 사항"}
            numberOfLines={4}
            onChangeText={(text) => setReservationField("memo", text)}
          />
          <IndustryToggle />

          <View
            style={{
              width: "50%",
              flexDirection: "row",
              alignItems: "flex-end",
              gap: 10,
            }}
          >
            <Input
              title={"가격"}
              value={reservation.price}
              onChangeText={(text) => setReservationField("price", text)}
            />
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>원</Text>
          </View>

          <DefaultBtn text={"완료"} onPress={handleSubmit} />
        </View>
      </ScrollView>
    </Page>
  );
};

export default ReservationHandler;
