import api from ".";

export const getPendingList = async () => {
  const res = await api.get("/list/pending"); // ✅ 경로 수정 필요
  return res.data;
};
