"use client";
import Button from "@/components/common/Button";
import useRiderStore from "@/store/rider/RiderStore";
import { RiderInput } from "../../common/input/RiderInput";
import { ItemList } from "../../common/ItemList";
import { BirthDate } from "../../common/date/BirthDate";
import { Revenue } from "../../common/Revenue";
import Layout from "../../common/Layout";

export const RiderUpdate = () => {
  const { formData, handleChange } = useRiderStore();

  return (
    <Layout title="기사 수정">
      <form className="space-y-6">
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
          onClick={() => {}}
          className="w-full bg-blue-500 hover:bg-blue-600"
        />
      </form>
    </Layout>
  );
};
