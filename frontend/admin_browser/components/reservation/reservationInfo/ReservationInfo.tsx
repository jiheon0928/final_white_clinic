"use client";
import Layout from "@/components/common/Layout";
import { useReservationStore } from "@/store/ReservationStore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getReservationSections } from "@/data/ReservationData";
import { ReservationSection } from "@/components/common/ReservationSection";
import { getReservations } from "@/utils/api/rev.api";
import { Reservation } from "@/types/RevStore/ReservationTypes";

export const ReservationInfo = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const searchParams = useSearchParams();
  const { currentStatus } = useReservationStore();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchReservations = async () => {
      const result = await getReservations(currentStatus);
      setReservations(result);
    };
    fetchReservations();
  }, [currentStatus]);

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
