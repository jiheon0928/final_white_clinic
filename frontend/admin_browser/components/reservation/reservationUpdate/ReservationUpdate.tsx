"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getReservationDetail, updateReservation } from "@/utils/api/rev.api";
import Layout from "@/components/common/Layout";
import { RevUpdateInput } from "@/components/common/input/RevInput";
import { NumItem } from "@/components/common/NumItem";
import { UpdateDate } from "@/components/common/date/UpdateDate";
import { UpdatePriceInput } from "@/components/common/input/UpdatePriceInput.tsx";
import Button from "@/components/common/Button";
import { useReservationStore } from "@/store/ReservationStore";

export const ReservationUpdate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { reservationData, setFormData } = useReservationStore();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getReservationDetail(Number(id));
      setFormData({
        reservationName: data.reservationName,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerRequest: data.customerRequest,
        zipcode: data.zipcode,
        address: data.address,
        detailAddress: data.detailAddress,
        visitTime: data.visitTime,
        memo: data.memo,
        price: data.price,
        industry: data.industry.id,
      });
    };
    fetchData();
  }, [id]);

  return (
    <Layout title="예약 수정">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await updateReservation(Number(id), reservationData);
          alert("예약 수정이 완료되었습니다.");
          router.push("/reservation");
        }}
        className="space-y-6"
      >
        <RevUpdateInput id={Number(id)} />
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold">
            가능 품목 리스트
          </label>
          <NumItem />
          <UpdateDate visitTime={reservationData.visitTime as string} />
        </div>
        <UpdatePriceInput price={reservationData.price} />
        <Button
          title="예약 수정"
          onClick={() => {
            router.push("/reservation");
          }}
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600"
        />
      </form>
    </Layout>
  );
};
