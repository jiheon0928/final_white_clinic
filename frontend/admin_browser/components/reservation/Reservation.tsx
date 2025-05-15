"use client";
import Link from "next/link";
import { data, riderList } from "../../data/data";
import { useRouter } from "next/navigation";
import { useReservationStore } from "@/store/reservation/RevState";

export const Reservation = () => {
  const reservationList = data();
  const router = useRouter();
  const handleClick = (path: string) => {
    router.push(path);
  };

  const { currentStatus, setStatus } = useReservationStore();

  const filteredReservations = reservationList.filter(
    (reservation) => reservation.status === currentStatus
  );

  return (
    <div className="flex flex-col gap-4 bg-white p-4">
      <h1 className="flex justify-center text-2xl font-bold bg-gradient-to-r from-blue-700 to-white bg-clip-text text-transparent">
        예약 목록
      </h1>
      <div className="flex justify-between items-center gap-2 mb-4">
        <div className="flex gap-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            onClick={() => setStatus("대기")}
          >
            대기 예약목록
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
            onClick={() => setStatus("진행중")}
          >
            진행중 예약목록
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
            onClick={() => setStatus("완료")}
          >
            완료 예약목록
          </button>
        </div>
        <Link
          href="/reservation/enroll"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
          onClick={() => handleClick("/reservation/enroll")}
        >
          예약 생성하기
        </Link>
      </div>

      {filteredReservations.map((reservation) => (
        <div
          key={reservation.id}
          className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-lg font-bold text-gray-800">
                수리 물품: {reservation.item}
              </h3>

              <span className="text-blue-500 font-semibold">
                {reservation.price}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm font-bold">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">
                  고객명: {reservation.name}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-gray-600">
                  방문시간: {reservation.time}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-gray-600">
                  방문날짜: {reservation.date}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-gray-600">
                  전화번호: {reservation.phone}
                </span>
              </div>

              <div className="flex items-center space-x-2 col-span-2">
                <span className="text-gray-600">
                  주소: {reservation.address}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Link
                href={`/reservation/detail?id=${reservation.id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
              >
                <span>상세정보</span>
              </Link>
              <Link
                href={`/reservation/update?id=${reservation.id}`}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center"
              >
                <span>예약 수정하기</span>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reservation;
