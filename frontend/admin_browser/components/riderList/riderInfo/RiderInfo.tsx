"use client";
import Layout from "@/components/common/Layout";
import { RiderData } from "@/types/RiderStore/RiderTypes";
import { getRiderById, getRiders } from "@/utils/api/rider.api";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const RiderInfo = () => {
  const [rider, setRider] = useState<RiderData>();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchRider = async () => {
      const result = await getRiderById(Number(id));
      setRider(result);
    };
    fetchRider();
  }, []);

  if (!rider) {
    return (
      <Layout title="기사님 상세정보" className="h-screen">
        <div className="text-center text-gray-500">
          기사님 정보를 찾을 수 없습니다.
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="기사님 상세정보" className="h-screen">
      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-600 mb-4 border-b pb-2">
            기사님 정보
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "이름", value: rider.name },
              { label: "이메일", value: rider.email },
              { label: "생년월일", value: rider.birth },
              { label: "전화번호", value: rider.phone },
              { label: "주소", value: rider.address },
              { label: "상세주소", value: rider.detailAddress },
              { label: "우편번호", value: rider.zipcode },
              { label: "특이사항", value: rider.significant },
              { label: "수당률", value: `${rider.benefit.benefitType * 100}%` },
            ].map((item, index) => (
              <span key={index} className="flex items-center text-gray-700">
                <p className="font-medium mr-2">{item.label}:</p>{" "}
                <p className="font-medium">{item.value}</p>
              </span>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
