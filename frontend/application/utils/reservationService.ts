import api from "./api";

// 예약자 데이터
const getReservations = async (status: "pending" | "progress" | "complete") => {
  try {
    const response = await api.get(`/reservation/${status}`);
    console.log("API 응답 데이터:", response.data);
  } catch (error) {
    console.error("예약 데이터 가져오기 실패:", error);
    throw error;
  }
};

export { getReservations };
