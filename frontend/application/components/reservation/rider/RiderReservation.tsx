import ReservationCard from "@/components/reservation/subCompontent/ReservationCard";
import DefaultHeader from "@/components/common/header/DefaultHeader";
import Page from "@/components/common/Page";
import SearchInput from "@/components/common/input/SearchInput";

import useReservationStore from "@/stores/reservation.store";
import { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native";
import { router } from "expo-router";
import { getReservations } from "@/utils/reservationService";
import { reservationType } from "@/types/data/reservationData";

const RiderReservation = ({ status }: { status: "대기" | "진행" | "완료" }) => {
  const [reservations, setReservations] = useState<reservationType[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  useEffect(() => {
    const fetchReservations = async () => {
      const reservations = await getReservations(status);
      setReservations(reservations);
    };
    fetchReservations();
  }, [reservations]);
  const { searchValue, setSearchValue } = useReservationStore();
  return (
    <Page>
      <DefaultHeader title={status} />
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
          .filter((v) => v.status.status === status)
          .filter(
            (v) =>
              v.reservationName.includes(searchValue) ||
              v.address.includes(searchValue)
          )
          .map((item) => (
            <ReservationCard
              key={item.id}
              goToLink={() => {
                router.push(`/rider/reservation/${item.id}`);
              }}
              title={item.reservationName}
              address={item.address}
              price={Number(item.price)}
              status={item.status.status}
            />
          ))}
      </ScrollView>
    </Page>
  );
};

export default RiderReservation;
