"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getReservationDetail } from "@/utils/api/rev.api";
import { useRevStore } from "@/store/test/rev.store";
import Layout from "@/components/common/Layout";
import { RevUpdateInput } from "@/components/common/input/RevInput";
import { NumItem } from "@/components/common/NumItem";
import { UpdateDate } from "@/components/common/date/UpdateDate";
import { UpdatePriceInput } from "@/components/common/input/UpdatePriceInput.tsx";
import Managers from "@/components/common/Managers";
import Button from "@/components/common/Button";

export const ReservationUpdate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { reservation, setReservation } = useRevStore();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getReservationDetail(Number(id));
      setReservation("reservationName", data.reservationName);
      setReservation("customerName", data.customerName);
      setReservation("customerPhone", data.customerPhone);
      setReservation("customerRequest", data.customerRequest);
      setReservation("zipcode", data.zipcode);
      setReservation("address", data.address);
      setReservation("detailAddress", data.detailAddress);
      setReservation("visitTime", data.visitTime);
      setReservation("memo", data.memo);
      setReservation("price", data.price);
      setReservation("industry", data.industry.id);
    };
    fetchData();
  }, [id]);

  return (
    <Layout title="예약 수정">
      <form onSubmit={() => {}} className="space-y-6">
        <RevUpdateInput id={Number(id)} />
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold">
            가능 품목 리스트
          </label>
          <NumItem />
          <UpdateDate visitTime={reservation.visitTime as string} />
        </div>
        <UpdatePriceInput price={reservation.price} />
        <Managers
          value={reservation.customerRequest}
          onChange={() => {}}
          title="담당 기사"
        />
        <Button
          title="예약 수정"
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600"
        />
      </form>
    </Layout>
  );
};
