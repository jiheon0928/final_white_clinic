"use client";
import Button from "../Button";
import { useEffect, useState } from "react";
import { RiderData } from "@/types/RiderStore/RiderTypes";
import { approveRider, getRiders } from "@/utils/api/rider.api";

export const VerifyCard = () => {
  const [riders, setRiders] = useState<RiderData[]>([]);

  useEffect(() => {
    const fetchRiders = async () => {
      const result = await getRiders();
      setRiders(result);
    };
    fetchRiders();
  }, []);

  const handleApproval = async (riderId: number) => {
    try {
      await approveRider(riderId);
      // 승인 후 목록 새로고침
      const updatedRiders = await getRiders();
      setRiders(updatedRiders);
      alert("승인이 완료되었습니다.");
    } catch (error) {
      console.error("승인 처리 중 오류가 발생했습니다:", error);
      alert("승인 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="space-y-4">
      {riders
        .filter((rider) => rider.approval === false)
        .map((verification) => (
          <div
            key={verification.id}
            className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {[
                { label: "이름", value: verification.name },
                { label: "이메일", value: verification.email },
                { label: "연락처", value: verification.phone },
                { label: "주소", value: verification.address },
              ].map((item, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span className="font-semibold text-gray-900">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
            {verification.approval === false && (
              <div className="flex justify-end mt-4">
                <Button
                  title="승인하기"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  onClick={() => handleApproval(verification.id)}
                />
              </div>
            )}
          </div>
        ))}
    </div>
  );
};
