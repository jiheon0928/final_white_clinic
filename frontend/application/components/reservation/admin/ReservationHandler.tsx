import DefaultBtn from "@/components/common/button/DefualtBtn";
import Input from "@/components/common/input/Input";
import Page from "@/components/common/Page";
import BackBtnHeader from "@/components/common/header/BackBtnHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TimeInput from "@/components/common/input/TimeInput";
import { View, Text, Platform, ScrollView } from "react-native";
import CalenderInput from "@/components/common/input/CalenderInput";
import useTimeStore from "@/stores/time.store";
import useDateStore from "@/stores/date.store";
import { router } from "expo-router";
import { combineDateAndTime } from "../../../hooks/format";
import AddressInput from "@/components/common/input/AddressInput";
import useAddressStore from "@/stores/address.store";
import useReservationStore from "@/stores/reservation.store";
import IndustryToggle from "@/components/common/input/IndustyToggle";
import {
  createReservation,
  getReservationDetail,
  updateReservation,
} from "@/utils/reservationService";
import { useEffect } from "react";
import useIndustryStore from "@/stores/industry.store";

const ReservationHandler = ({ id, title }: { id?: string; title: string }) => {
  const insets = useSafeAreaInsets();
  const { reservation, setReservationField, resetReservation, setReservation } =
    useReservationStore();
  const { industryId, setSelectedIndustry, resetIndustry } = useIndustryStore();
  const { date, resetDate, setDate } = useDateStore();
  const { time, resetTime, setTime } = useTimeStore();
  const { zipcode, address, detailAddress, resetAddress, setAddress } =
    useAddressStore();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const reservation = await getReservationDetail(Number(id));

        setReservation({
          reservationName: reservation.reservationName,
          customerName: reservation.customerName,
          customerPhone: reservation.customerPhone,
          customerRequest: reservation.customerRequest,
          zipcode: reservation.zipcode,
          address: reservation.address,
          detailAddress: reservation.detailAddress,
          visitTime: reservation.visitTime,
          memo: reservation.memo,
          price: reservation.price,
          industry: reservation.industry.id,
        });
        setAddress("zipcode", reservation.zipcode);
        setAddress("address", reservation.address);
        setAddress("detailAddress", reservation.detailAddress);
        setDate(new Date(reservation.visitTime));
        setTime(new Date(reservation.visitTime));
        setSelectedIndustry(reservation.industry.industry);
      };
      fetchData();
    }
  }, [id]);

  const handleSubmit = async () => {
    setReservationField("industry", industryId);
    setReservationField("visitTime", combineDateAndTime(date, time));
    setReservationField("zipcode", zipcode);
    setReservationField("address", address);
    setReservationField("detailAddress", detailAddress);
    const result = useReservationStore.getState().reservation;
    console.log(result);
    if (id) await updateReservation(result, Number(id));
    else await createReservation(result);
    console.log(result);
    resetReservation();
    resetDate();
    resetTime();
    resetAddress();
    resetIndustry();
    if (id) router.replace(`/admin/reservations/${id}`);
    else router.replace("/admin/reservations");
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
            value={reservation.memo}
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
              value={reservation.price.toString()}
              onChangeText={(text) =>
                setReservationField("price", Number(text))
              }
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
