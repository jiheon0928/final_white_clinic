"use client";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useReservationStore } from "@/store/ReservationStore";
import { getReservations } from "@/utils/api/rev.api";
import { Reservation } from "@/types/RevStore/ReservationTypes";

export const ReservationCard = () => {
  const router = useRouter();
  const { currentStatus } = useReservationStore();
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const result = await getReservations(currentStatus);
      console.log(result);
      setReservations(result);
    };
    fetchReservations();
  }, [currentStatus]);

  // 방문날짜 우선순
  const sortedReservations = [...reservations]
    .sort((a, b) => new Date(b.visitTime).getTime() - new Date(a.visitTime).getTime());

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {sortedReservations.map((reservation) => (
          <div
            key={reservation.id}
            className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col space-y-3">
              <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-lg font-bold text-gray-800">
                  예약자: {reservation.reservationName}
                </h3>
                <span className="text-blue-500 font-semibold">
                  {reservation.price}원
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm font-bold">
                {[
                  { label: "고객명", value: reservation.customerName },
                  {
                    label: "방문시간",
                    value: new Date(reservation.visitTime).toLocaleString(),
                  },
                  { label: "전화번호", value: reservation.customerPhone },
                  { label: "주소", value: reservation.address, colSpan: 2 },
                  { label: "상세주소", value: reservation.detailAddress },
                  { label: "우편번호", value: reservation.zipcode },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-2 ${
                      item.colSpan ? `col-span-${item.colSpan}` : ""
                    }`}
                  >
                    <span className="text-gray-600">
                      {item.label}: {item.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  title="상세정보"
                  onClick={() => router.push(`/reservation/detail?id=${reservation.id}`)}
                  className="bg-blue-500 hover:bg-blue-600"
                />
                <Button
                  title="예약 수정하기"
                  onClick={() => router.push(`/reservation/update?id=${reservation.id}`)}
                  className="bg-yellow-500 hover:bg-yellow-600"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
