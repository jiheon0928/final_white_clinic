"use client";
import { useRouter } from "next/navigation";
import { useReservationStore } from "@/store/ReservationStore";
import { useApiStore } from "@/store/Api";
import Button from "../common/Button";
import { ReservationCard } from "../common/card/ReservartionCard";
import Layout from "../common/Layout";
import { useEffect } from "react";

export const Reservation = () => {
  const router = useRouter();
  const { currentStatus, setStatus } = useReservationStore();
  const { reservations, getReservations, isLoading, error } = useApiStore();

  useEffect(() => {
    getReservations();
  }, [getReservations]);

  const handleClick = (path: string) => {
    router.push(path);
  };

  const filteredReservations = reservations.filter(
    (reservation) => reservation.status === currentStatus
  );

  return (
    <Layout title="예약 관리" className="h-screen">
      <div className="flex justify-between items-center gap-2 mb-4">
        <div className="flex gap-2">
          <Button
            title="대기 예약목록"
            onClick={() => setStatus("대기")}
            className="bg-blue-500 hover:bg-blue-600"
          />
          <Button
            title="진행중 예약목록"
            onClick={() => setStatus("진행")}
            className="bg-green-500 hover:bg-green-600"
          />
          <Button
            title="완료 예약목록"
            onClick={() => setStatus("완료")}
            className="bg-gray-500 hover:bg-gray-600"
          />
        </div>
        <Button
          title="예약 생성하기"
          onClick={() => handleClick("/reservation/enroll")}
          className="bg-green-500 hover:bg-green-600"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center p-4">
          <p>데이터를 불러오는데 실패했습니다.</p>
          <p className="text-sm">{error}</p>
          <Button
            title="다시 시도"
            onClick={() => getReservations()}
            className="mt-2 bg-blue-500 hover:bg-blue-600"
          />
        </div>
      ) : filteredReservations.length === 0 ? (
        <div className="text-center p-4 text-gray-500">
          {currentStatus} 상태의 예약이 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReservations.map((reservation) => (
            <ReservationCard
              key={reservation.id}
              id={reservation.id}
              name={reservation.name}
              phone={reservation.phone}
              address={reservation.address}
              date={reservation.date}
              time={reservation.time}
              status={reservation.status}
              price={reservation.price}
              item={reservation.item}
              goToLink={() =>
                handleClick(`/reservation/edit/${reservation.id}`)
              }
            />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Reservation;
