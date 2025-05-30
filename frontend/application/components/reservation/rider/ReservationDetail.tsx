import DefaultBtn from "@/components/common/button/DefualtBtn";
import Info from "@/components/common/text/Info";
import Page from "@/components/common/Page";
import { Text, View } from "react-native";
import BackBtnHeader from "@/components/common/header/BackBtnHeader";
import { router } from "expo-router";
import { ReservationDetailStyles } from "@/styles/reservation/detail";
import { getReservationDetailInfoList, btnText } from "@/hooks/dataHandler";
import { reservationType } from "@/types/data/reservationData";
import {
  accessReservation,
  completeReservation,
  getReservationDetail,
} from "@/utils/reservationService";
import { useEffect } from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReservationDetail = ({ id }: { id: string }) => {
  const [reservation, setReservation] = useState<reservationType | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservation = async () => {
      const reservation = await getReservationDetail(Number(id));
      setReservation(reservation);
    };
    const getAccessToken = async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");
      setAccessToken(accessToken);
    };
    fetchReservation();
    getAccessToken();
  }, []);

  if (!accessToken) {
    return (
      <Page>
        <Text>로그인 후 이용해주세요.</Text>
      </Page>
    );
  }
  if (!reservation) {
    return (
      <Page>
        <BackBtnHeader title="예약 상세 페이지" />
        <Text>예약 정보를 찾을 수 없습니다.</Text>
      </Page>
    );
  }
  const { customerRequest, memo } = reservation;
  return (
    <Page>
      <BackBtnHeader title="예약 상세 페이지" />
      <View style={ReservationDetailStyles.box}>
        {getReservationDetailInfoList(reservation).map((info) => (
          <Info
            key={info.category}
            value={info.value}
            category={info.category}
          />
        ))}
        <Text style={ReservationDetailStyles.label}>고객 요청 사항</Text>
        <View style={ReservationDetailStyles.requestBox}>
          <Text style={ReservationDetailStyles.text}>{customerRequest}</Text>
        </View>
        <Text style={ReservationDetailStyles.label}>기사 요청 사항</Text>
        <View style={ReservationDetailStyles.requestBox}>
          <Text style={ReservationDetailStyles.text}>{memo}</Text>
        </View>
      </View>
      {reservation.status.status !== "완료" && (
        <DefaultBtn
          onPress={() => {
            if (reservation.status.status == "대기") {
              accessReservation(Number(id), accessToken);
              router.push(`/rider/(tabs)/progress`);
            } else {
              completeReservation(Number(id), accessToken);
              router.push(`/rider/(tabs)/completed`);
            }
          }}
          text={btnText(reservation.status.status)}
        />
      )}
    </Page>
  );
};

export default ReservationDetail;
