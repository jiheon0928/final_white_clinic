"use client";
import { useReservationStore } from "@/store/ReservationStore";
import Button from "@/components/common/Button";
import { ItemList } from "@/components/common/ItemList";
import { EnrollDate } from "@/components/common/date/EnrollDate";
import Managers from "@/components/common/Managers";
import { RevInput } from "@/components/common/input/RevInput";
import { PriceInput } from "@/components/common/input/PriceInput";
import Layout from "@/components/common/Layout";

export const ReservationUpdate = () => {
  const { manager, setManager } = useReservationStore();

  return (
    <Layout title="예약 수정">
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
          onClick={() => {}}
          className="w-full bg-blue-500 hover:bg-blue-600"
        />
      </form>
    </Layout>
  );
};
