"use client";
import Button from "@/components/common/Button";
import { RiderInput } from "../../common/input/RiderInput";
import { Revenue } from "../../common/Revenue";
import Layout from "../../common/Layout";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { ArrayItem } from "@/components/common/ArrayItem";
import useRiderStore from "@/store/rider/RiderStore";
import { getRiderById, updateRider } from "@/utils/api/rider.api";
import { BirthDate } from "@/components/common/date/BirthDate";
import { RiderData } from "@/types/RiderStore/RiderTypes";

export const RiderUpdate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { riderData, setFormData } = useRiderStore();

  useEffect(() => {
    const fetchRider = async () => {
      const result = await getRiderById(Number(id));
      setFormData({
        name: result.name,
        phone: result.phone,
        email: result.email,    
        zipcode: result.zipcode,
        address: result.address,
        detailAddress: result.detailAddress,
        significant: result.significant,
        industry: result.industry?.map((industry) => industry.id) || [] ,
        benefit: result.benefit.id,
        birth: result.birth,
      });
    };
    fetchRider();
  }, [id, setFormData]);

  return (
    <Layout title="기사 수정">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const transformedBenefit = {
            ...riderData,
            benefit: parseFloat(riderData.benefit.toString()) === 0.4 ? 1 : parseFloat(riderData.benefit.toString()) === 0.5 ? 2 : 3
          };
          await updateRider(Number(id), transformedBenefit as unknown as RiderData);
          alert("기사 수정이 완료되었습니다.");
          router.push("/rider");
        }}
        className="space-y-6"
      >
        <RiderInput />
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold">
            가능 품목 리스트
          </label>
          <ArrayItem />
          <BirthDate birth={riderData.birth} />
        </div>
        <Revenue />
        <Button
          title="수정하기"
          onClick={() => {console.log(riderData)}}
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600"
        />
      </form>
    </Layout>
  );
};
