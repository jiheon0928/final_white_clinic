import api from ".";

export const getInProgressJobs = async (driverId: number) => {
  const res = await api.get(`/list/in-progress/${driverId}`);
  return res.data;
};
