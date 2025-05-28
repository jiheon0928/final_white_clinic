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
  console.log(id, "id");
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
              benefit: rider.benefit?.benefitType?.toString() || "40",
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
    e.preventDefault();

    console.log(formData, "제출된 데이터");
    try {
      console.log(Number(id), "id");
      if (!id) return;
      const rider = riders.find((r) => r.id === Number(id));
      if (!rider) {
        alert("기사를 찾을 수 없습니다.");
        return;
      }
      await updateRiderInfo(Number(id), formData);
      console.log("데이터 수정완료");
      alert("기사 정보가 성공적으로 수정되었습니다.");
      router.push("/riderList");
    } catch (error) {
      console.error("기사 정보 수정 실패:", error);
      alert("기사 정보 수정에 실패했습니다.");
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
          onClick={(e: React.FormEvent) => {
            handleSubmit(e);
          }}
        />
      </form>
    </Layout>
  );
};
