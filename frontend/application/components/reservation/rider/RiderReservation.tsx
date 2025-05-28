import ReservationCard from "@/components/reservation/subCompontent/ReservationCard";
import DefaultHeader from "@/components/common/header/DefaultHeader";
import Page from "@/components/common/Page";
import SearchInput from "@/components/common/input/SearchInput";
import { reservationDummy } from "@/dummyData/reservationData";
import useReservationStore from "@/stores/reservation.store";
import { useRef } from "react";
import { ScrollView } from "react-native";
import { router } from "expo-router";

const RiderReservation = ({ status }: { status: "대기" | "진행" | "완료" }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const { searchValue, setSearchValue } = useReservationStore();
  return (
    <Page>
      <DefaultHeader title="대기" />
      <SearchInput
        placeholder="검색어를 입력해주세요"
        onChangeText={(text) => setSearchValue(text)}
      />
      <ScrollView
        ref={scrollViewRef}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {reservationDummy
          .filter((v) => v.상태 == status)
          .filter(
            (v) => v.제목.includes(searchValue) || v.주소.includes(searchValue)
          )
          .map((item) => (
            <ReservationCard
              key={item.id}
              goToLink={() => {
                router.push(`/rider/reservation/${item.id}`);
              }}
              title={item.제목}
              address={item.주소}
              price={Number(item.단가)}
              status={item.상태}
            />
          ))}
      </ScrollView>
    </Page>
  );
};

export default RiderReservation;
