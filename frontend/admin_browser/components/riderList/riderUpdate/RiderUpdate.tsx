"use client";
import Button from "@/components/common/Button";
import useRiderStore from "@/store/rider/RiderStore";
import { RiderInput } from "../../common/input/RiderInput";
import { ItemList } from "../../common/ItemList";
import { BirthDate } from "../../common/date/BirthDate";
import { Revenue } from "../../common/Revenue";

export const RiderUpdate = () => {
  const { formData, handleChange } = useRiderStore();

  return (
    <div className="flex flex-col gap-4 bg-white p-8 rounded-lg text-black shadow-lg max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
        기사 정보 수정
      </h1>
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
          type="submit"
          onClick={() => {}}
          className="w-full bg-blue-500 hover:bg-blue-600"
        />
      </form>
    </div>
  );
};
