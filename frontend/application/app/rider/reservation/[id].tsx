import DefaultBtn from "@/components/common/button/DefualtBtn";
import Info from "@/components/common/text/Info";
import Page from "@/components/common/Page";
import { Text, View } from "react-native";
import BackBtnHeader from "@/components/common/header/BackBtnHeader";
import { reservationDummy } from "@/dummyData/reservationData";
import { router, useLocalSearchParams } from "expo-router";
import { ReservationDetailStyles } from "@/styles/reservation/detail";
import {
  getReservationDetailInfoList,
  isReservationCompleted,
  btnText,
} from "@/hooks/dataHandler";

const ReservationDetail = () => {
  const { id } = useLocalSearchParams();
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
            value={info.value}
            category={info.category}
          />
        ))}
        <Text style={ReservationDetailStyles.label}>고객 요청 사항</Text>
        <View style={ReservationDetailStyles.requestBox}>
          <Text style={ReservationDetailStyles.text}>{request}</Text>
        </View>
        <Text style={ReservationDetailStyles.label}>기사 요청 사항</Text>
        <View style={ReservationDetailStyles.requestBox}>
          <Text style={ReservationDetailStyles.text}>{memo}</Text>
        </View>
      </View>
      {!isReservationCompleted(statusId) && (
        <DefaultBtn
          onPress={() => {
            if (statusId === 1) {
              router.push(`/rider/(tabs)/progress`);
            } else {
              router.push(`/rider/(tabs)/completed`);
            }
          }}
          text={btnText(statusId)}
        />
      )}
    </Page>
  );
};

export default ReservationDetail;
