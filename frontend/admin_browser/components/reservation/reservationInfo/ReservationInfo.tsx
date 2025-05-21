"use client";
import { data } from "@/data/data";
import Layout from "@/components/common/Layout";

export const ReservationInfo = () => {
  const reservationData = data(); // data는 함수이므로 호출해야 함
  const reservation = reservationData[0]; // 첫 번째 예약 데이터를 가져옴

  return (
    <Layout title="예약 상세 정보">
      <div key={reservation.id} className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-600 mb-4 border-b pb-2">
            예약 정보
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="flex items-center text-gray-700">
              <span className="font-medium mr-2">수리 물품:</span>{" "}
              {reservation.item}
            </p>
            {/* 담당기사 fk로 받아올 예정 */}
            <p className="flex items-center text-gray-700">
              <span className="font-medium mr-2">예약 번호:</span>{" "}
              {reservation.id}
            </p>
            <p className="flex items-center text-gray-700">
              <span className="font-medium mr-2">예약 날짜:</span>{" "}
              {reservation.date}
            </p>
            <p className="flex items-center text-gray-700">
              <span className="font-medium mr-2">예약 시간:</span>{" "}
              {reservation.time}
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
              <span className="font-medium mr-2">고객 이름:</span>{" "}
              {reservation.name}
            </p>
            <p className="flex items-center text-gray-700">
              <span className="font-medium mr-2">고객 전화번호:</span>{" "}
              {reservation.phone}
            </p>
            <p className="flex items-center text-gray-700">
              <span className="font-medium mr-2">고객 주소:</span>{" "}
              {reservation.address}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
