"use client";
import Button from "@/components/common/Button";
import useRiderStore from "@/store/rider/RiderStore";
import { RiderInput } from "../../common/input/RiderInput";
import { ItemList } from "../../common/ItemList";
import { BirthDate } from "../../common/date/BirthDate";
import { Revenue } from "../../common/Revenue";
import Layout from "../../common/Layout";
import { useApiStore } from "@/store/Api";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const RiderUpdate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { updateRiderInfo, riders } = useApiStore();
  const { formData, handleChange, setFormData } = useRiderStore();

  useEffect(() => {
    const fetchRiderData = async () => {
      if (id) {
        try {
          const rider = riders.find((r) => r.id === Number(id));
          if (rider) {
            setFormData({
              name: rider.name,
              birth: rider.birth,
              loginId: rider.loginId,
              password: rider.password,
              phone: rider.phone,
              address: rider.address,
              detailAddress: rider.detailAddress,
              zipcode: rider.zipcode,
              email: rider.email,
              significant: rider.significant,
              approval: rider.approval,
              benefitId: rider.benefitId || 1,
              // industryId: rider.industryId,
            });
          }
        } catch (error) {
          console.error("기사 정보를 가져오는데 실패했습니다:", error);
        }
      }
    };

    fetchRiderData();
  }, [id, riders, setFormData]);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(formData, "formData");
    e.preventDefault();
    try {
      if (!id) {
        alert("기사 ID가 없습니다.");
        return;
      }
      const updateData = {
        ...formData,
        benefitId: formData.benefitId ? Number(formData.benefitId) : undefined,
        birth: formData.birth
          ? new Date(formData.birth).toISOString()
          : undefined,
      };
      await updateRiderInfo(Number(id), updateData);
      alert("기사 정보가 성공적으로 수정되었습니다.");
      router.push("/riderList");
    } catch (error) {
      console.error("기사 정보 수정 실패:", error);
      alert(
        error instanceof Error
          ? error.message
          : "기사 정보 수정에 실패했습니다."
      );
    }
  };

  return (
    <Layout title="기사 수정">
      <form onSubmit={handleSubmit} className="space-y-6">
        <RiderInput />
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold">
            가능 품목 리스트
          </label>
          <ItemList />
          <BirthDate />
        </div>
        <Revenue />
        <Button
          title="수정하기"
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600"
        />
      </form>
    </Layout>
  );
};
