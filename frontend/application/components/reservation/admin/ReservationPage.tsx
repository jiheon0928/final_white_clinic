import { ScrollView } from "react-native";
import { reservationDummy, statusData } from "@/dummyData/reservationData";
import ReservationCard from "../../reservation/subCompontent/ReservationCard";
import SearchInput from "@/components/common/input/SearchInput";
import Page from "@/components/common/Page";
import StatusBar from "../../reservation/subCompontent/StatusBar";
import useReservationStore from "@/stores/reservation.store";
import { useRef, useEffect } from "react";
import BetweenHeader from "@/components/common/header/BetweenHeader";
import { router } from "expo-router";

const ReservationPage = () => {
  const { status, searchValue, setSearchValue } = useReservationStore();
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }, [status]);

  return (
    <Page>
      <BetweenHeader
        title="예약 현황"
        btnName="예약등록"
        onPress={() => {
          router.push("/admin/reservations/create");
        }}
      />
      <StatusBar />
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
          .filter((v) => statusData[v.statusId - 1].status == status)
          .filter(
            (v) =>
              v.item.includes(searchValue) ||
              v.address.includes(searchValue) ||
              v.customer.includes(searchValue)
          )
          .map((item) => (
            <ReservationCard
              key={item.id}
              goToLink={() => {
                router.push(`/admin/reservations/${item.id}`);
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

export default ReservationPage;
