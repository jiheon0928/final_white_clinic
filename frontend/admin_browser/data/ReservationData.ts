import { ReservationSection } from "@/types/RevStore/ReservationTypes";

export const getReservationSections = (
  reservation: any
): ReservationSection[] => [
  {
    title: "예약 정보",
    items: [
      { label: "요청사항", value: reservation.reservationName },
      { label: "예약 번호", value: reservation.id },
      {
        label: "예약 날짜",
        value: reservation.visitTime.split("T")[0],
      },
      {
        label: "예약 시간",
        value: new Date(reservation.visitTime).toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      {
        label: "총 금액",
        value: reservation.price,
        isHighlighted: true,
      },
    ],
  },
  {
    title: "고객 정보",
    items: [
      { label: "예약자 이름", value: reservation.customerName },
      { label: "고객 전화번호", value: reservation.customerPhone },
      {
        label: "고객 주소",
        value: `${reservation.address} ${reservation.detailAddress} (${reservation.zipcode})`,
      },
      { label: "요청사항", value: reservation.customerRequest },
      { label: "기사님 전달사항", value: reservation.memo },
    ],
  },
];
