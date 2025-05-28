import ReservationCard from "@/components/reservation/subCompontent/ReservationCard";
import DefaultHeader from "@/components/common/header/DefaultHeader";
import Page from "@/components/common/Page";
import SearchInput from "@/components/common/input/SearchInput";
import { reservationDummy, statusData } from "@/dummyData/reservationData";
import useReservationStore from "@/stores/reservation.store";
import { useRef } from "react";
import { ScrollView } from "react-native";
import { router } from "expo-router";

const RiderReservation = ({ status }: { status: number }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const { searchValue, setSearchValue } = useReservationStore();
  return (
    <Page>
      <DefaultHeader title={statusData[status - 1].status} />
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
          .filter((v) => v.statusId == status)
          .filter(
            (v) =>
              v.item.includes(searchValue) || v.address.includes(searchValue)
          )
          .map((item) => (
            <ReservationCard
              key={item.id}
              goToLink={() => {
                router.push(`/rider/reservation/${item.id}`);
              }}
              title={item.item}
              address={item.address}
              price={Number(item.price)}
              status={statusData[item.statusId - 1].status}
            />
          ))}
      </ScrollView>
    </Page>
  );
};

export default RiderReservation;
