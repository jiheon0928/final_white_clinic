import axios from "axios";

const API_URL = "http://192.168.4.4:3001/api";

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
