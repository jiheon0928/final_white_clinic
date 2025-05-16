import axios from "axios";
const API_BASE_URL = "";
const api = axios.create({
  baseURL: API_BASE_URL, // 여기를 실제 백엔드 주소로 변경
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// export const getGuestbooks = async (): Promise<Guestbook[]> => {
//   const response = await axios.get(`${API_BASE_URL}/guestbook`);
//   return response.data;
// };

export default api;
