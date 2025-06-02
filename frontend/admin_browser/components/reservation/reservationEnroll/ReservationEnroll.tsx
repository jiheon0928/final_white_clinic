"use client";
import Button from "@/components/common/Button";
import { useReservationStore } from "@/store/ReservationStore";
import { EnrollDate } from "@/components/common/date/EnrollDate";
import Layout from "@/components/common/Layout";
import { useRouter } from "next/navigation";
import { useApiStore } from "@/store/Api";
import { RevEnrollInput } from "@/components/common/input/RevEnrollInput";
import { NumItem } from "@/components/common/NumItem";
import { EnrollPriceInput } from "@/components/common/input/EnrollPriceInput";
import { handleReservationSubmit } from "@/utils/handlers/reservationHandlers";
import { ReservationFormData } from "@/types/reservation";

export const ReservationEnroll = () => {
  const { formData } = useReservationStore();
  const router = useRouter();
  const { createReservation } = useApiStore() as any;

  return (
    <Layout title="예약 생성">
      <form
        onSubmit={(e) =>
          handleReservationSubmit(
            e,
            formData as ReservationFormData,
            createReservation,
            router
          )
        }
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
          className="w-full bg-blue-500 hover:bg-blue-600"
        />
      </form>
    </Layout>
  );
};
