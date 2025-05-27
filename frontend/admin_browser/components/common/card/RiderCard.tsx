import Button from "../Button";
import { useRouter } from "next/navigation";
import { Rider } from "@/types/RiderStore/RiderTypes";
import { useApiStore } from "@/store/Api";
import { RiderErrorMessage } from "../errorMessage/RiderError";
import { useRiderStore } from "@/store/rider/SearchRider";
import { useEffect } from "react";

export const RiderCard = () => {
  const router = useRouter();
  const { riders, getRiders, isLoading, error } = useApiStore();
  const { filteredRiders } = useRiderStore();

  useEffect(() => {
    getRiders();
  }, []);

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
        {filteredRiders
          .filter((rider) => rider.approval === true)
          .map((rider: Rider) => (
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
                <div className="flex gap-2">
                  <Button
                    title="기사님 정보수정"
                    onClick={() =>
                      handleClick(`/rider/update?name=${rider.name}`)
                    }
                    className="bg-green-500 hover:bg-green-600"
                  />
                  <Button
                    title="기사님 상세정보"
                    onClick={() => handleClick(`/rider/detail?id=${rider.id}`)}
                    className="bg-blue-500 hover:bg-blue-600"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "연락처", value: rider.phone },
                  { label: "주소", value: rider.address },
                  { label: "이메일", value: rider.email },
                  { label: "생년월일", value: rider.birth },
                  { label: "특이사항", value: rider.significant },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-gray-500">{item.label}:</span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <span className="text-lg font-bold text-blue-600">
                  수수료: {rider.benefit?.benefitType || 40}%
                </span>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
