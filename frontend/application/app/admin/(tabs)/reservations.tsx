import React from "react";
import { ScrollView, Text } from "react-native";
import { reservationDummy } from "@/dummyData/reservationData";
import Page from "@/components/common/Page";
import SearchInput from "@/components/common/SearchInput";
import StatusBar from "@/components/reservation/subComponents/StatusBar";
import ReservationCard from "@/components/reservation/subComponents/ReservationCard";
import { commonStyles } from "@/styles/common";

const Reservations = () => {
  return (
    <Page>
      <Text style={[commonStyles.pageHeader, { marginBottom: 20 }]}>
        예약 현황
      </Text>
      <StatusBar />
      <SearchInput placeholder="검색어를 입력해주세요" />

      <ScrollView>
        {reservationDummy.map((item) => (
          <ReservationCard
            key={item.id}
            id={item.id.toString()}
            title={item.제목}
            address={item.주소}
            price={item.단가}
            status={item.상태}
          />
        ))}
      </ScrollView>
    </Page>
  );
};

export default Reservations;
