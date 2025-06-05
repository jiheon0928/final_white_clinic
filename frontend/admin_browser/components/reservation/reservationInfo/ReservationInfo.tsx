"use client";
import Layout from "@/components/common/Layout";
import { useApiStore } from "@/store/Api";
import { useReservationStore } from "@/store/ReservationStore";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getReservationSections } from "@/data/ReservationData";
import { ReservationSection } from "@/components/common/ReservationSection";

export const ReservationInfo = () => {
  const { reservations, getReservations } = useApiStore();
  const searchParams = useSearchParams();
  const { currentStatus } = useReservationStore();
  const id = searchParams.get("id");

  useEffect(() => {
    getReservations(currentStatus as "대기" | "진행" | "완료");
  }, [currentStatus, getReservations]);

  const reservation = reservations.find(
    (reservation) => reservation.id === Number(id)
  );

  if (!reservation) {
    return (
      <Layout title="예약 상세 정보" className="h-screen">
        <div className="text-center text-gray-500">
          예약 정보를 찾을 수 없습니다.
        </div>
      </Layout>
    );
  }

  const sections = getReservationSections(reservation);

  return (
    <Layout title="예약 상세 정보" className="h-screen">
      <div className="space-y-6">
        {sections.map((section) => (
          <ReservationSection
            key={section.title}
            title={section.title}
            items={section.items}
          />
        ))}
      </div>
    </Layout>
  );
};
