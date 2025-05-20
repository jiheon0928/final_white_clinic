"use client";
import Button from "@/components/common/Button";
import { useReservationStore } from "@/store/reservation/ReservationStore";
import { ItemList } from "@/components/common/ItemList";
import { EnrollDate } from "@/components/common/date/EnrollDate";
import { RevInput } from "@/components/common/input/RevInput";
import { PriceInput } from "@/components/common/input/PriceInput";

export const ReservationEnroll = () => {
  const { formData, handleChange } = useReservationStore();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-8 text-blue-600">
        신규 예약 생성
      </h1>
      <form className="space-y-6">
        <RevInput />
        <div className="flex flex-col gap-2">
          <label htmlFor="item" className="text-gray-700 font-semibold">
            수리 물품
          </label>
          <ItemList />
        </div>
        <EnrollDate />
        <PriceInput />
        <Button
          title="예약 생성하기"
          type="submit"
          onClick={() => {}}
          className="w-full bg-blue-500 hover:bg-blue-600"
        />
      </form>
    </div>
  );
};
