"use client";
import { useRouter } from "next/navigation";
import { useReservationStore } from "@/store/ReservationStore";
import Button from "../common/Button";
import { ReservationCard } from "../common/card/ReservartionCard";
import Layout from "../common/Layout";

export const Reservation = () => {
  const router = useRouter();
  const handleClick = (path: string) => {
    router.push(path);
  };
  const { currentStatus, setStatus } = useReservationStore();

  return (
    <Layout title="예약 관리" className="h-screen">
      <div className="flex justify-between items-center gap-2 mb-4">
        <div className="flex gap-2">
          <Button
            title="대기 예약목록"
            onClick={() => setStatus("대기")}
            className="bg-blue-500 hover:bg-blue-600"
          />
          <Button
            title="진행중 예약목록"
            onClick={() => setStatus("진행")}
            className="bg-green-500 hover:bg-green-600"
          />
          <Button
            title="완료 예약목록"
            onClick={() => setStatus("완료")}
            className="bg-gray-500 hover:bg-gray-600"
          />
        </div>
        <Button
          title="예약 생성하기"
          onClick={() => handleClick("/reservation/enroll")}
          className="bg-green-500 hover:bg-green-600"
        />
      </div>
      <ReservationCard />
    </Layout>
  );
};

export default Reservation;
