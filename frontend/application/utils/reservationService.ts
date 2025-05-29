import { ReservationState } from "@/types/stores/zustandStore.types";
import api from "./api";
import { reservationType } from "@/dummyData/reservationData";

// 예약 데이터
export const getReservations = async (
  status: "대기" | "진행" | "완료"
): Promise<reservationType[]> => {
  try {
    const response = await api.get(`/reservation?status=${status}`);
    console.log("API 응답 데이터:", response.data);
    return response.data;
  } catch (error) {
    console.error("예약 데이터 가져오기 실패:", error);
    throw error;
  }
};

export const getReservationDetail = async (
  id: number
): Promise<reservationType> => {
  try {
    const response = await api.get(`/reservation/${id}`);
    return response.data;
  } catch (error) {
    console.error("예약 상세 데이터 가져오기 실패:", error);
    throw error;
  }
};

export const createReservation = async (
  reservation: ReservationState["reservation"]
) => {
  try {
    const response = await api.post("/reservation", reservation);
    return response.data;
  } catch (error) {
    console.error("예약 생성 실패:", error);
    throw error;
  }
};

export const updateReservation = async (
  reservation: ReservationState["reservation"],
  id: number
) => {
  try {
    const response = await api.patch(`/reservation/${id}`, reservation);
    return response.data;
  } catch (error) {
    console.error("예약 수정 실패:", error);
    throw error;
  }
};
