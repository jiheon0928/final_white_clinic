import Button from "../Button";
import { useRouter } from "next/navigation";
import { useApiStore } from "@/store/Api";
import { useEffect } from "react";
import { RevErrorMessage } from "../errorMessage/RevError";

export const ReservationCard = () => {
  const { reservations, getReservations, isLoading, error } = useApiStore();
  const router = useRouter();

  useEffect(() => {
    getReservations();
  }, [getReservations]);

  const handleClick = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <RevErrorMessage
        isLoading={isLoading}
        error={error || ""}
        getReservations={getReservations}
        reservations={reservations}
      />
      <div className="grid grid-cols-1 gap-4">
        {reservations.map((reservation) => (
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
                  {reservation.price}원
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm font-bold">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">
                    고객명: {reservation.customer}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">
                    방문시간: {reservation.visitTime}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">
                    방문날짜: {reservation.date.split("T")[0]}
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
                <Button
                  title="상세정보"
                  onClick={() =>
                    handleClick(`/reservation/detail?id=${reservation.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-600"
                />
                <Button
                  title="예약 수정하기"
                  onClick={() =>
                    handleClick(`/reservation/update?id=${reservation.id}`)
                  }
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
