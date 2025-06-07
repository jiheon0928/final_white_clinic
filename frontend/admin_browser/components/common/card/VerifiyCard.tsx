"use client";
import Button from "../Button";
import { useEffect, useState } from "react";
import { RiderData } from "@/types/RiderStore/RiderTypes";
import { getRiders } from "@/utils/api/rider.api";
import { useRouter } from "next/navigation";

export const VerifyCard = () => {
  const router = useRouter();
  const [riders, setRiders] = useState<RiderData[]>([]);

  useEffect(() => {
    const fetchRiders = async () => {
      const result = await getRiders();
      setRiders(result);
    };
    fetchRiders();
  }, []);

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
                  onClick={() => (verification.id)}
                />
              </div>
            )}
          </div>
        ))}
    </div>
  );
};
