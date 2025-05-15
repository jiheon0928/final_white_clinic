import { data } from "@/data/data";

export const ProcessRev = () => {
  const reservationList = data();

  return (
    <div className="bg-white p-4 rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
        진행중인 예약건
      </h1>
      {reservationList.map((reservation) => (
        <div
          key={reservation.id}
          className="border border-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow mb-4 bg-white"
        >
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between items-center border-b border-blue-200 pb-2">
              <h2 className="text-lg font-bold text-blue-800">
                {reservation.name}
              </h2>
              <span className="text-blue-600 font-semibold">
                {reservation.price}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center text-blue-700">
                <span className="font-medium mr-2">연락처:</span>
                {reservation.phone}
              </div>

              <div className="flex items-center text-blue-700">
                <span className="font-medium mr-2">수리 물품:</span>
                {reservation.item}
              </div>

              {/* 담당기사 fk로 받아서 map으로 뿌려야함 */}

              <div className="flex items-center text-blue-700">
                <span className="font-medium mr-2">예약 날짜:</span>
                {reservation.date}
              </div>

              <div className="flex items-center text-blue-700">
                <span className="font-medium mr-2">예약 시간:</span>
                {reservation.time}
              </div>
            </div>

            <div className="mt-2 text-blue-700">
              <span className="font-medium mr-2">주소:</span>
              {reservation.address}
            </div>

            <div className="flex justify-end mt-4">
              <button className="bg-white text-green-600 border border-green-500 px-4 py-2 rounded-md hover:bg-green-50 transition-colors">
                처리완료
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
