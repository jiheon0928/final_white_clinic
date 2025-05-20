import { Text, View } from "react-native";
import { ScrollView } from "react-native";
import { reservationDummy } from "@/dummyData/reservationData";
import ReservationCard from "./subComponents/ReservationCard";
import SearchInput from "@/components/common/SearchInput";
import Page from "@/components/common/Page";
import StatusBar from "./subComponents/StatusBar";
import useReservationStore from "@/stores/reservation.store";
import { useRef, useEffect } from "react";
import PageHeader from "@/components/common/PageHeader";

const ReservationPage = () => {
  const { status, searchValue, setSearchValue } = useReservationStore();
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }, [status]);

  return (
    <Page>
      <View style={{ flex: 1 }}>
        <PageHeader title="예약 현황" variant="leftBtn" />
        <StatusBar />
        <SearchInput
          placeholder="검색어를 입력해주세요"
          onChangeText={setSearchValue}
        />
        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {reservationDummy
            .filter((v) => v.상태 == status)
            .filter(
              (v) =>
                v.제목.includes(searchValue) || v.주소.includes(searchValue)
            )
            .map((item) => (
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
      </View>
    </Page>
  );
};

export default ReservationPage;
