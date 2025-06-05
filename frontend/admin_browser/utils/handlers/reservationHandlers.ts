import { FormEvent } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
  ReservationFormData,
  ApiResponse,
  ReservationResponse,
} from "@/types/reservation";

export const handleReservationSubmit = async (
  e: FormEvent<HTMLFormElement>,
  formData: ReservationFormData,
  createReservation: (
    data: ReservationFormData
  ) => Promise<ApiResponse<ReservationResponse>>,
  router: AppRouterInstance
) => {
  e.preventDefault();
  try {
    const response = await createReservation(formData);
    if (response.status === 200) {
      alert("예약 생성이 완료되었습니다.");
      router.push("/reservation");
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    console.error("예약 생성 실패:", error);
    alert("예약 생성에 실패했습니다.");
  }
};
