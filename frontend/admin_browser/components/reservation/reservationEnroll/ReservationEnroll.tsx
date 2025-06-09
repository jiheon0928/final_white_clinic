"use client";
import Button from "@/components/common/Button";
import { EnrollDate } from "@/components/common/date/EnrollDate";
import Layout from "@/components/common/Layout";
import { useRouter } from "next/navigation";
import { RevEnrollInput } from "@/components/common/input/RevEnrollInput";
import { NumItem } from "@/components/common/NumItem";
import { EnrollPriceInput } from "@/components/common/input/EnrollPriceInput";
import { useReservationStore } from "@/store/ReservationStore";
import { createReservation } from "@/utils/api/rev.api";
import { FormEvent } from "react";

export const ReservationEnroll = () => {
  const router = useRouter();
  const { reservationData } = useReservationStore();

  const handleReservationSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createReservation(reservationData);
    alert("예약 생성이 완료되었습니다.");
  };

  return (
    <Layout title="예약 생성">
      <form
        onSubmit={handleReservationSubmit}
        className="space-y-6"
      >
        <RevEnrollInput />
        <div className="flex flex-col gap-2">
          <label htmlFor="item" className="text-gray-700 font-semibold">
            수리 물품
          </label>
          <NumItem />
        </div>
        <EnrollDate />
        <EnrollPriceInput />
        <Button
          title="예약 생성하기"
          onClick={() => {
            router.push("/reservation");
          }}
          className="w-full bg-blue-500 hover:bg-blue-600"
        />
      </form>
    </Layout>
  );
};
