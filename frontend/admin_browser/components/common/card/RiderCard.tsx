import Button from "../Button";
import { useRouter } from "next/navigation";
import { Rider } from "@/types/RiderStore/RiderTypes";
import { useApiStore } from "@/store/Api";
import { RiderErrorMessage } from "../errorMessage/RiderError";
import { useRiderStore } from "@/store/rider/SearchRider";
import { useEffect } from "react";

export const RiderCard = () => {
  const router = useRouter();
  const { riders, getRiders, isLoading, error, getApprovedRiders } =
    useApiStore();
  const { filteredRiders } = useRiderStore();

  const handleClick = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <RiderErrorMessage
        isLoading={isLoading}
        error={error || ""}
        getRiders={getRiders}
        riders={riders}
      />
      <div className="flex flex-col gap-4">
        {filteredRiders.map((rider: Rider) => (
          <div
            key={rider.id}
            className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between mb-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    {rider.name[0]}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-blue-600">
                  {rider.name}
                </h2>
              </div>
              <Button
                title="기사님 정보수정"
                onClick={() => handleClick(`/rider/update?name=${rider.name}`)}
                className="bg-green-500 hover:bg-green-600"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">연락처:</span>
                <p className="font-medium">{rider.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">주소:</span>
                <p className="font-medium">{rider.address}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">이메일:</span>
                <p className="font-medium">{rider.email}</p>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <p className="text-lg font-bold text-blue-600">
                수수료: {rider.benefit}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
