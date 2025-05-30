"use client";
import Button from "@/components/common/Button";
import { useReservationStore } from "@/store/ReservationStore";
import { EnrollDate } from "@/components/common/date/EnrollDate";
import { PriceInput } from "@/components/common/input/PriceInput";
import Layout from "@/components/common/Layout";
import { useRouter } from "next/navigation";
import { useApiStore } from "@/store/Api";
import { RevInput } from "@/components/common/input/RevInput";
import { NumItem } from "@/components/common/NumItem";

export const ReservationEnroll = () => {
  const { formData } = useReservationStore();
  const router = useRouter();
  const { createReservation } = useApiStore() as any;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createReservation(formData);
    router.push("/reservation");
  };
  return (
    <Layout title="예약 생성">
      <form onSubmit={handleSubmit} className="space-y-6">
        <RevInput />
        <div className="flex flex-col gap-2">
          <label htmlFor="item" className="text-gray-700 font-semibold">
            수리 물품
          </label>
          <NumItem />
        </div>
        <EnrollDate />
        <PriceInput />
        <Button
          title="예약 생성하기"
          className="w-full bg-blue-500 hover:bg-blue-600"
        />
      </form>
    </Layout>
  );
};
