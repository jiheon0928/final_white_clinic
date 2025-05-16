"use client";
import { data } from "@/data/data";

export const ReservationInfo = () => {
  const reservationData = data()[0]; // 첫 번째 예약 데이터를 가져옴

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">
        예약 상세 정보
      </h1>

      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-600 mb-4 border-b pb-2">
            예약 정보
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="flex items-center text-gray-700">
              <span className="font-medium mr-2">수리 물품:</span>{" "}
              {reservationData.item}
            </p>
            {/* 담당기사 fk로 받아올 예정 */}
            <p className="flex items-center text-gray-700">
              <span className="font-medium mr-2">예약 번호:</span>{" "}
              {reservationData.id}
            </p>
            <p className="flex items-center text-gray-700">
              <span className="font-medium mr-2">예약 날짜:</span>{" "}
              {reservationData.date}
            </p>
            <p className="flex items-center text-gray-700">
              <span className="font-medium mr-2">예약 시간:</span>{" "}
              {reservationData.time}
            </p>
            <p className="flex items-center text-blue-600 font-semibold">
              <span className="font-medium mr-2">총 금액:</span>{" "}
              {reservationData.price}
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
              {reservationData.name}
            </p>
            <p className="flex items-center text-gray-700">
              <span className="font-medium mr-2">고객 전화번호:</span>{" "}
              {reservationData.phone}
            </p>
            <p className="flex items-center text-gray-700">
              <span className="font-medium mr-2">고객 주소:</span>{" "}
              {reservationData.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
