import { create } from "zustand";
import axios from "axios";
import { ApiStore } from "@/types/ApiStore";

const API_URL = "http://localhost:3001";

export const useApiStore = create<ApiStore>((set) => ({
  riders: [],
  reservations: [],

  getRiders: async () => {
    try {
      const response = await axios.get(`${API_URL}/riders`);
      set({ riders: response.data });
    } catch (error) {
      console.error("기사 데이터 가져오기 실패", error);
      set({ riders: [] });
    }
  },

  getReservations: async () => {
    try {
      const response = await axios.get(`${API_URL}/reservations`);
      set({ reservations: response.data });
    } catch (error) {
      console.error("예약 데이터 가져오기 실패", error);
      set({ reservations: [] });
    }
  },
}));
