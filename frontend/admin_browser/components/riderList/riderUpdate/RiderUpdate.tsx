"use client";
import Button from "@/components/common/Button";
import useRiderStore from "@/store/rider/RiderStore";
import { RiderInput } from "../../common/input/RiderInput";
import { BirthDate } from "../../common/date/BirthDate";
import { Revenue } from "../../common/Revenue";
import Layout from "../../common/Layout";
import { useApiStore } from "@/store/Api";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { ArrayItem } from "@/components/common/ArrayItem";
export const RiderUpdate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { updateRiderInfo, riders, getRiders } = useApiStore();
  const { formData } = useRiderStore();

  useEffect(() => {
    getRiders();
  }, []);
  const rider = riders.find((rider) => rider.id === Number(id));

  const handleSubmit = async (e: React.FormEvent) => {
    const { approval, loginId, password, ...updateData } = formData;

    console.log("업데이트데이터", updateData);
    e.preventDefault();
    try {
      if (!id) {
        alert("기사 ID가 없습니다.");
        return;
      }
      await updateRiderInfo(Number(id), updateData);
      alert("기사 정보가 성공적으로 수정되었습니다.");
      router.push("/rider");
    } catch (error) {
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
        <RiderInput id={Number(id)} />
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold">
            가능 품목 리스트
          </label>
          <ArrayItem />
          <BirthDate birth={rider?.birth} />
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
