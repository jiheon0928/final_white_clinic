"use client";
import { useReservationStore } from "@/store/ReservationStore";
import Button from "@/components/common/Button";
import { ItemList } from "@/components/common/ItemList";
import { EnrollDate } from "@/components/common/date/EnrollDate";
import Managers from "@/components/common/Managers";
import { RevInput } from "@/components/common/input/RevInput";
import { PriceInput } from "@/components/common/input/PriceInput";
import Layout from "@/components/common/Layout";
import { useRouter, useSearchParams } from "next/navigation";
import { useApiStore } from "@/store/Api";
import { useEffect } from "react";

export const ReservationUpdate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { updateReservation, reservations } = useApiStore();
  const { formData, setFormData, handleChange } = useReservationStore();

  useEffect(() => {
    const fetchReservationData = async () => {
      if (id) {
        const reservation = reservations.find((r) => r.id === Number(id));
        if (reservation) {
          setFormData({
            reservationName: reservation.reservationName || "",
            customerName: reservation.customerName || "",
            customerPhone: reservation.customerPhone || "",
            customerRequest: reservation.customerRequest || "",
            zipcode: reservation.zipcode || "",
            address: reservation.address || "",
            detailAddress: reservation.detailAddress || "",
            price: Number(reservation.price) || 0,
            request: reservation.request || "",
            memo: reservation.memo || "",
            visitTime: reservation.visitTime || "",
            industryId: Number(reservation.industryId) || 0,
            manager: reservation.manager || "",
          });
        }
      }
    };

    fetchReservationData();
  }, [id, reservations, setFormData]);

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
        <RevInput />
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold">
            가능 품목 리스트
          </label>
          <ItemList />
          <EnrollDate />
        </div>
        <PriceInput />
        <Managers
          value={formData.manager || ""}
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
