import { ReservationState } from "@/types/stores/zustandStore.types";
import api from "./api";

// 예약 데이터
const getReservations = async (status: "대기" | "진행" | "완료") => {
  try {
    const response = await api.get(`/reservation/status=${status}`);
    console.log("API 응답 데이터:", response.data);
    return response.data;
  } catch (error) {
    console.error("예약 데이터 가져오기 실패:", error);
    throw error;
  }
};

const createReservation = async (
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

export { getReservations };
