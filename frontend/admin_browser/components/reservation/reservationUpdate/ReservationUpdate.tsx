"use client";
import { useReservationStore } from "@/store/reservation/ReservationStore";
import Button from "@/components/common/Button";
import { ItemList } from "@/components/common/ItemList";
import { EnrollDate } from "@/components/common/date/EnrollDate";
import Managers from "@/components/common/Managers";
import { RevInput } from "@/components/common/input/RevInput";
import { PriceInput } from "@/components/common/input/PriceInput";

export const ReservationUpdate = () => {
  const { manager, setManager } = useReservationStore();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-8 text-blue-600">
        예약 수정하기
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
        <div className="flex flex-col gap-4">
          <Managers
            value={manager}
            onChange={(e) => setManager(e.target.value)}
            title="담당 기사"
          />
          <PriceInput />
        </div>
        <Button
          title="예약 수정"
          type="submit"
          onClick={() => {}}
          className="w-full bg-blue-500 hover:bg-blue-600"
        />
      </form>
    </div>
  );
};
