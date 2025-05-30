import { ScrollView } from "react-native";
import { reservationType } from "@/types/data/reservationData";
import ReservationCard from "../../reservation/subCompontent/ReservationCard";
import SearchInput from "@/components/common/input/SearchInput";
import Page from "@/components/common/Page";
import StatusBar from "../../reservation/subCompontent/StatusBar";
import useReservationStore from "@/stores/reservation.store";
import { useRef, useEffect, useState } from "react";
import BetweenHeader from "@/components/common/header/BetweenHeader";
import { router } from "expo-router";
import { getReservations } from "@/utils/reservationService";

const ReservationPage = () => {
  const { status, searchValue, setSearchValue, setStatus } =
    useReservationStore();
  const scrollViewRef = useRef<ScrollView>(null);
  const [reservations, setReservations] = useState<reservationType[]>([]);
  useEffect(() => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });

    const fetchData = async () => {
      const data = await getReservations(status);
      setReservations(data);
    };

    fetchData();
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
        onChangeText={(text: string) => setSearchValue(text)}
      />
      <ScrollView
        ref={scrollViewRef}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {reservations
          .filter(
            (v) =>
              (v.reservationName?.includes(searchValue) ?? false) ||
              (v.address?.includes(searchValue) ?? false) ||
              (v.customerName?.includes(searchValue) ?? false)
          )
          .map((item) => (
            <ReservationCard
              key={item.id}
              goToLink={() => router.push(`/admin/reservations/${item.id}`)}
              title={item.reservationName}
              address={item.address}
              price={item.price}
              status={item.status?.status}
            />
          ))}
      </ScrollView>
    </Page>
  );
};

export default ReservationPage;
