import { useReservationStore } from "@/store/ReservationStore";
import { InputFields } from "@/types/RevStore/ReservationTypes";
import { ReservationFormData } from "@/types/RevStore/ReservationTypes";

export const getCustomerInputFields = (reservation: ReservationFormData): InputFields => {
  const { reservationData } = useReservationStore();
  return [
    {
      title: "수리건",
      name: "reservationName",
      placeholder: "수리건",
      value: reservationData.reservationName || reservation.reservationName || "",
      type: "text",
    },
    {
      title: "고객 이름",
      name: "customerName",
      placeholder: "고객 이름",
      value: reservationData.customerName || reservation.customerName || "",
      type: "text",
    },
    {
      title: "고객 전화번호",
      name: "customerPhone",
      placeholder: "고객 전화번호",
      value: reservationData.customerPhone || reservation.customerPhone || "",
      type: "text",
    },
    {
      title: "방문 주소",
      name: "address",
      placeholder: "방문 주소",
      value: reservationData.address || reservation.address || "",
      type: "text",
    },
    {
      title: "상세주소",
      name: "detailAddress",
      placeholder: "상세주소",
      value: reservationData.detailAddress || reservation.detailAddress || "",
      type: "text",
    },
    {
      title: "우편번호",
      name: "zipcode",
      placeholder: "우편번호",
      value: reservationData.zipcode || reservation.zipcode || "",
      type: "text",
    },
    {
      title: "고객 요청사항",
      name: "customerRequest",
      placeholder: "고객 요청사항을 입력해주세요.",
      value: reservationData.customerRequest || reservation.customerRequest,
      type: "text",
    },
    {
      title: "기사님 전달사항",
      name: "memo",
      placeholder: "기사님 전달사항을 입력해주세요.",
      value: reservationData.memo || reservation.memo,
      type: "text",
    },
  ];
};
