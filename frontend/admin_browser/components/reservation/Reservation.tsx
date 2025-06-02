"use client";
import { useRouter } from "next/navigation";
import Button from "../common/Button";
import { ReservationCard } from "../common/card/ReservartionCard";
import Layout from "../common/Layout";
import { useReservationStore } from "@/store/ReservationStore";

export const Reservation = () => {
  const router = useRouter();
  const { setStatus, setFormData } = useReservationStore();
  const handleClick = (path: string) => {
    setFormData({
      reservationName: "",
      customerName: "",
      customerPhone: "",
      customerRequest: "",
      zipcode: "",
      address: "",
      detailAddress: "",
      visitTime: "",
      memo: "",
      price: 0,
      industry: 0,
    });
    router.push(path);
  };

  return (
    <Layout title="예약 관리">
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
