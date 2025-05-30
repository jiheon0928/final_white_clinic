"use client";
import Layout from "@/components/common/Layout";

import { useApiStore } from "@/store/Api";
import { useReservationStore } from "@/store/ReservationStore";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const ReservationInfo = () => {
  const { reservations, getReservations } = useApiStore();
  const searchParams = useSearchParams();
  const { currentStatus } = useReservationStore();
  const id = searchParams.get("id");

  useEffect(() => {
    getReservations(currentStatus as "대기" | "진행" | "완료");
  }, []);

  const reservation = reservations.find(
    (reservation) => reservation.id === Number(id)
  );
  console.log("나는 개똥벌레", reservation);
  if (!reservation) {
    return (
      <Layout title="예약 상세 정보" className="h-screen">
        <div className="text-center text-gray-500">
          예약 정보를 찾을 수 없습니다.
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="예약 상세 정보" className="h-screen">
      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-600 mb-4 border-b pb-2">
            예약 정보
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="flex items-center text-gray-700">
              <span className="font-medium mr-2">요청사항:</span>{" "}
              {reservation.reservationName}
            </p>
            <p className="flex items-center text-gray-700">
              <span className="font-medium mr-2">예약 번호:</span>{" "}
              {reservation.id}
            </p>
            <p className="flex items-center text-gray-700">
              <span className="font-medium mr-2">예약 날짜:</span>{" "}
              {reservation.visitTime.split("T")[0]}
            </p>
            <p className="flex items-center text-gray-700">
              <span className="font-medium mr-2">예약 시간:</span>{" "}
              {new Date(reservation.visitTime).toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="flex items-center text-blue-600 font-semibold">
              <span className="font-medium mr-2">총 금액:</span>{" "}
              {reservation.price}
            </p>
          </div>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-600 mb-4 border-b pb-2">
            고객 정보
          </h2>
          <div className="space-y-3">
            <p className="flex items-center text-gray-700">
              <span className="font-medium mr-2">예약자 이름:</span>{" "}
              {reservation.customerName}
            </p>
            <p className="flex items-center text-gray-700">
              <span className="font-medium mr-2">고객 전화번호:</span>{" "}
              {reservation.customerPhone}
            </p>
            <p className="flex items-center text-gray-700">
              <span className="font-medium mr-2">고객 주소:</span>{" "}
              {`${reservation.address} ${reservation.detailAddress} (${reservation.zipcode})`}
            </p>
            <p className="flex items-center text-gray-700">
              <span className="font-medium mr-2">요청사항:</span>{" "}
              {reservation.customerRequest}
            </p>
            <p className="flex items-center text-gray-700">
              <span className="font-medium mr-2">기사님 전달사항:</span>{" "}
              {reservation.memo}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
