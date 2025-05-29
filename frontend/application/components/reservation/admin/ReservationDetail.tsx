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
  isReservationCompleted,
} from "@/hooks/dataHandler";
import Title from "@/components/common/text/Title";

const ReservationDetail = ({ id }: { id: string }) => {
  const reservation = reservationDummy.find((v) => v.id === Number(id));

  if (!reservation) {
    return (
      <Page>
        <BackBtnHeader title="예약 상세 페이지" />
        <Text>예약 정보를 찾을 수 없습니다.</Text>
      </Page>
    );
  }

  const { request, memo, statusId } = reservation;

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
          <Text style={ReservationDetailStyles.text}>{request}</Text>
        </View>
        <Text style={ReservationDetailStyles.label}>기사님 전달 사항</Text>
        <View style={ReservationDetailStyles.requestBox}>
          <Text style={ReservationDetailStyles.text}>{memo}</Text>
        </View>
        {reservation.riderId && (
          <View style={ReservationDetailStyles.riderInfo}>
            <Title title="< 기사 정보 >" />
            {getReservationDetailRiderInfo(reservation).map((info) => (
              <Info
                key={info.category}
                category={info.category}
                value={info.value}
              />
            ))}
          </View>
        )}
      </View>

      {!isReservationCompleted(statusId) && (
        <DefaultBtn
          text="예약 수정"
          onPress={() => router.push(`/admin/reservations/edit/${id}`)}
        />
      )}
    </Page>
  );
};

export default ReservationDetail;
