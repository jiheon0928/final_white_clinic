import { data } from "@/data/data";

export const ExpiredRev = () => {
  const reservationList = data();
  return (
    <div className="bg-white p-4 rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
        완료된 예약
      </h1>
      {reservationList.map((reservation) => (
        <div
          key={reservation.id}
          className="border border-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow mb-4 bg-gray-50"
        >
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between items-center border-b border-gray-300 pb-2">
              <h2 className="text-lg font-bold text-gray-800">
                {reservation.name}
              </h2>
              <span className="text-gray-600 font-semibold">
                {reservation.price}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center text-gray-700">
                <span className="font-medium mr-2">연락처:</span>
                {reservation.phone}
              </div>

              <div className="flex items-center text-gray-700">
                <span className="font-medium mr-2">수리 물품:</span>
                {reservation.item}
              </div>

              {/* 담당기사 fk로 받아서 map으로 뿌려야함 */}

              <div className="flex items-center text-gray-700">
                <span className="font-medium mr-2">예약 날짜:</span>
                {reservation.date}
              </div>

              <div className="flex items-center text-gray-700">
                <span className="font-medium mr-2">예약 시간:</span>
                {reservation.time}
              </div>
            </div>

            <div className="mt-2 text-gray-700">
              <span className="font-medium mr-2">주소:</span>
              {reservation.address}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
