import { Reservation } from "@/types/RevStore/ReservationTypes";
import api from "./api";
import { ReservationFormData } from "@/types/RevStore/ReservationTypes";

// 예약 데이터
export const getReservations = async (
  status: "대기" | "진행" | "완료"
): Promise<Reservation[]> => {
  try {
    const response = await api.get(`/reservation?status=${status}`);
    return response.data;
  } catch (error) {
    console.error("예약 데이터 가져오기 실패:", error);
    throw error;
  }
};

export const getReservationDetail = async (
  id: number
): Promise<Reservation> => {
  try {
    const response = await api.get(`/reservation/id/${id}`);
    return response.data;
  } catch (error) {
    console.error("예약 상세 데이터 가져오기 실패:", error);
    throw error;
  }
};
export const getReservationByRider = async (
  accessToken: string,
  status: "대기" | "진행" | "완료"
) => {
  try {
    const response = await api.get(`/reservation/my?status=${status}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("예약 데이터 가져오기 실패:", error);
    throw error;
  }
};

export const createReservation = async (
  reservation: ReservationFormData
) => {
  try {
    const modifiedReservation = {
      ...reservation,
      price: Number(reservation.price)
    };
    const response = await api.post("/reservation", modifiedReservation);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("예약 생성 실패:", error);
    throw error;
  }
};

export const updateReservation = async (
  id: number,
  reservation: ReservationFormData
) => {
  try {
    const modifiedReservation = {
      ...reservation,
      price: Number(reservation.price)
    };
    const response = await api.patch(`/reservation/id/${id}`, modifiedReservation);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("예약 수정 실패:", error);
    throw error;
  }
};

export const accessReservation = async (id: number, accessToken: string) => {
  try {
    const response = await api.patch(
      `/reservation/id/${id}/pickup`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("예약 수정 실패:", error);
    throw error;
  }
};

export const completeReservation = async (id: number, accessToken: string) => {
  try {
    const response = await api.patch(
      `/reservation/complete/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("예약 완료 실패:", error);
    throw error;
  }
};
