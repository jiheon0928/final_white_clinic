import { View, Text } from "react-native";
import { router } from "expo-router";
import Page from "@/components/common/Page";
import BackBtnHeader from "@/components/common/header/BackBtnHeader";
import Info from "@/components/common/text/Info";

import DefaultBtn from "@/components/common/button/DefualtBtn";
import { ReservationDetailStyles } from "@/styles/reservation/detail";
import {
  getReservationDetailInfoList,
  getReservationDetailRiderInfo,
} from "@/hooks/dataHandler";
import Title from "@/components/common/text/Title";
import { useEffect, useState } from "react";
import { reservationType } from "@/dummyData/reservationData";
import { getReservationDetail } from "@/utils/reservationService";

const ReservationDetail = ({ id }: { id: string }) => {
  const [reservation, setReservation] = useState<reservationType | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getReservationDetail(Number(id));
      setReservation(data);
    };
    fetchData();
  }, [id]);

  if (!reservation) {
    return (
      <Page>
        <BackBtnHeader title="예약 상세 페이지" />
        <Text>예약 정보를 찾을 수 없습니다.</Text>
      </Page>
    );
  }

  const { customerRequest, memo, status } = reservation;

  return (
    <Page>
      <BackBtnHeader title="예약 상세 페이지" />
      <View style={ReservationDetailStyles.box}>
        {getReservationDetailInfoList(reservation).map((info) => (
          <Info
            key={info.category}
            category={info.category}
            value={info.value}
          />
        ))}
        <Text style={ReservationDetailStyles.label}>고객 요청사항</Text>
        <View style={ReservationDetailStyles.requestBox}>
          <Text style={ReservationDetailStyles.text}>{customerRequest}</Text>
        </View>
        <Text style={ReservationDetailStyles.label}>기사님 전달 사항</Text>
        <View style={ReservationDetailStyles.requestBox}>
          <Text style={ReservationDetailStyles.text}>{memo}</Text>
        </View>
        {reservation.rider && (
          <View style={ReservationDetailStyles.riderInfo}>
            <Title title="< 기사 정보 >" />
            {getReservationDetailRiderInfo(reservation.rider).map((info) => (
              <Info
                key={info.category}
                category={info.category}
                value={info.value}
              />
            ))}
          </View>
        )}
      </View>

      {reservation.status.status !== "완료" && (
        <DefaultBtn
          text="예약 수정"
          onPress={() => router.push(`/admin/reservations/edit/${id}`)}
        />
      )}
    </Page>
  );
};

export default ReservationDetail;
