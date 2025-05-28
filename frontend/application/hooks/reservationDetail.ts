import {
  industryData,
  reservationDummyType,
  statusData,
} from "@/dummyData/reservationData";
import { formatDate, formatTime } from "@/hooks/format";

const getIndustryName = (industryId: number): string => {
  return industryData.find((v) => v.id === industryId)?.industry ?? "-";
};

export const isReservationCompleted = (statusId: number): boolean => {
  return statusData[statusId - 1]?.status === "완료";
};

export const getReservationDetailInfoList = (
  reservation: reservationDummyType
) => {
  return [
    { category: "제목", value: reservation.item },
    { category: "분야", value: getIndustryName(reservation.industryId) },
    { category: "고객명", value: reservation.customer },
    { category: "연락처", value: reservation.phone },
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

export const btnText = (status: number) => {
  if (status == 1) {
    return "수락";
  } else if (status == 2) {
    return "완료";
  } else {
    return "확인";
  }
};
