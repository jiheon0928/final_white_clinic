import { StatusBar, Text } from "react-native";
import { ScrollView } from "react-native";
import Page from "../common/Page";
import { reservationDummy } from "@/dummyData/reservationData";
import ReservationCard from "./subComponents/ReservationCard";
import SearchInput from "../common/SearchInput";
import { commonStyles } from "@/styles/common";

const ReservationPage = () => {
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

export default ReservationPage;
