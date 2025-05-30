"use client";
import { useReservationStore } from "@/store/ReservationStore";
import Button from "@/components/common/Button";
import Managers from "@/components/common/Managers";
import { RevUpdateInput } from "@/components/common/input/RevInput";
import { UpdatePriceInput } from "@/components/common/input/UpdatePriceInput.tsx";
import Layout from "@/components/common/Layout";
import { useRouter, useSearchParams } from "next/navigation";
import { useApiStore } from "@/store/Api";
import { useEffect } from "react";
import { NumItem } from "@/components/common/NumItem";
import { UpdateDate } from "@/components/common/date/UpdateDate";

export const ReservationUpdate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { updateReservation, reservations, getReservations } = useApiStore();
  const { formData, handleChange, currentStatus } = useReservationStore();

  useEffect(() => {
    getReservations(currentStatus as "대기" | "진행" | "완료");
  }, []);
  const reservation = reservations.find(
    (reservation) => reservation.id === Number(id)
  );
  console.log("나는 개똥벌레", reservation);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!id) {
        alert("예약 ID가 없습니다.");
        return;
      }
      const { visitTime, ...updateData } = formData;
      console.log("전송할 데이터:", updateData);
      await updateReservation(Number(id), updateData);
      alert("예약 정보가 성공적으로 수정되었습니다.");
      router.push("/reservation");
    } catch (error) {
      console.error("예약 정보 수정 실패:", error);
      alert(
        error instanceof Error
          ? error.message
          : "예약 정보 수정에 실패했습니다."
      );
    }
  };

  return (
    <Layout title="예약 수정">
      <form onSubmit={handleSubmit} className="space-y-6">
        <RevUpdateInput id={Number(id)} />
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold">
            가능 품목 리스트
          </label>
          <NumItem />
          <UpdateDate visitTime={reservation?.visitTime || ""} />
        </div>
        <UpdatePriceInput price={reservation?.price || 0} />
        <Managers
          value={formData.customerRequest || ""}
          onChange={handleChange}
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
