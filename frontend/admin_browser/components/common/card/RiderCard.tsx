"use client";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { RiderData } from "@/types/RiderStore/RiderTypes";
import { useEffect, useState } from "react";
import { useRiderSearchStore } from "@/store/rider/SearchRider";
import { getRiders } from "@/utils/api/rider.api";

export const RiderCard = () => {
  const router = useRouter();
  const { search } = useRiderSearchStore();
  const [riders, setRiders] = useState<RiderData[]>([]);

  useEffect(() => {
    const fetchRiders = async () => {
      const result = await getRiders();
      setRiders(result);
    };
    fetchRiders();
  }, [search]);

  const sortedRiders = [...riders]
    .filter((rider) => rider.approval === true)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <div className="flex flex-col gap-4">
        {sortedRiders.map((rider: RiderData) => (
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
                  onClick={() => router.push(`/rider/update?id=${rider.id}`)}
                  className="bg-green-500 hover:bg-green-600"
                />
                <Button
                  title="기사님 상세정보"
                  onClick={() => router.push(`/rider/detail?id=${rider.id}`)}
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
