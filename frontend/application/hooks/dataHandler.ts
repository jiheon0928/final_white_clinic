import { RiderData } from "@/types/data/riderData";
import { formatDate, formatTime } from "@/hooks/format";
import { reservationType } from "@/types/data/reservationData";

export const getReservationDetailInfoList = (reservation: reservationType) => {
  return [
    { category: "제목", value: reservation.reservationName },
    { category: "분야", value: reservation.industry.industry },
    { category: "고객명", value: reservation.customerName },
    { category: "연락처", value: reservation.customerPhone },
    {
      category: "방문 날짜",
      value: formatDate(new Date(reservation.visitTime)),
    },
    {
      category: "방문 시간",
      value: formatTime(new Date(reservation.visitTime)),
    },
    { category: "주소", value: reservation.address },
    { category: "단가", value: `${reservation.price.toLocaleString()}원` },
  ];
};

export const getReservationDetailRiderInfo = (rider: RiderData) => {
  if (!rider) return [];
  return [
    { category: "이름", value: rider.name },
    { category: "연락처", value: rider.phone },
    {
      category: "수당률",
      value: `${rider.benefit.benefitType * 100}%`,
    },
  ];
};

// 기사 데이터
export const getPendingRider = (
  rider: RiderData
): { category: string; value: string }[] => [
  { category: "이름", value: rider.name },
  { category: "연락처", value: rider.phone },
  { category: "생년월일", value: formatDate(new Date(rider.birth)) },
  { category: "주소", value: `${rider.address}${rider.detailAddress}` },
  { category: "이메일", value: rider.email },
  {
    category: "수당률",
    value: `${rider.benefit.benefitType * 100}%`,
  },
];

export const btnText = (status: "대기" | "진행" | "완료") => {
  if (status == "대기") {
    return "수락";
  } else if (status == "진행") {
    return "완료";
  } else {
    return "확인";
  }
};
