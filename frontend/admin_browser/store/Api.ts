import { create } from "zustand";
import axios from "axios";
import { RiderInfoList } from "@/types/RiderTypes";
import { ReservationList } from "@/types/ReservationTypes";

const API_URL = "http://localhost:3001";

interface ApiStore {
  riders: RiderInfoList;
  reservations: ReservationList;
  getRiders: () => Promise<void>;
  getReservations: () => Promise<void>;
}

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
