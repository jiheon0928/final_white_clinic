import useEditRiderStore from "@/stores/editRider.store";
import api from "./api";

// 기사 데이터
const getRiders = async () => {
  try {
    const response = await api.get("/user");
    console.log("API 응답 데이터:", response.data);
  } catch (error) {
    console.error("기사 데이터 가져오기 실패:", error);
    throw error;
  }
};

// 기사 이름 목록
const getRiderNames = async () => {
  try {
    const response = await api.get("/user");
    return response.data.map((rider: any) => ({
      id: rider.id,
      name: rider.name,
    }));
  } catch (error) {
    console.error("기사 이름 목록 가져오기 실패:", error);
    throw error;
  }
};

// 기사 수수료 업데이트
const updateRiderBenefit = (riderId: number, benefitType: number) => {
  api.patch(`/user/${riderId}/benefit`, { benefitType });
};

// 기사 승인 상태 업데이트
const updateRiderApproval = async (riderId: number) => {
  await api.patch(`/user/${riderId}/approval`);
  const response = await api.get("/user");
  useEditRiderStore.getState().setRider(response.data);
};

export { getRiders, getRiderNames, updateRiderBenefit, updateRiderApproval };
