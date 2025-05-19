import api from ".";

export const getCompletedJobs = async (driverId: number) => {
  const res = await api.get(`/list/completed/${driverId}`); // 경로수정 필요
  return res.data;
};
