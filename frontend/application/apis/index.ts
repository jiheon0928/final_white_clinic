import axios from "axios";
const API_BASE_URL = ""; //경로 수정 필요
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
