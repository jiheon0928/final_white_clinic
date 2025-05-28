import { create } from "zustand";
import { api } from "./Api";

// axios instance가 있는 위치 기준
interface SalesStore {
  weeklySalesByDay: { x: string; y: number }[];
  yearlySalesByMonth: { x: string; y: number }[];
  isLoading: boolean;
  error: string | null;
  dailySales: number;
  weeklySales: number;
  monthlySales: number;

  getWeeklySalesByDay: (date: string) => Promise<void>;
  getYearlySalesByMonth: (year: string) => Promise<void>;
  getDailySales: (date: string) => Promise<void>;
  getWeeklySales: (date: string) => Promise<void>;
  getMonthlySales: (date: string) => Promise<void>;
}

export const useSalesStore = create<SalesStore>((set) => ({
  weeklySalesByDay: [],
  yearlySalesByMonth: [],
  isLoading: false,
  error: null,
  dailySales: 0,
  weeklySales: 0,
  monthlySales: 0,

  getDailySales: async (date) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get(`/sales/sales-by-date`, {
        params: { date },
      });
      const rawData = response.data["매출"];
      set({ dailySales: Number(rawData) });
    } catch (error) {
      console.error("일일 매출 조회 실패:", error);
      set({
        error: "일일 매출 정보를 불러오는 데 실패했습니다.",
        isLoading: false,
      });
    }
  },
  getMonthlySales: async (date) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get(`/sales/monthly-sales`, {
        params: { date },
      });
      const rawData = response.data["매출"];
      set({ monthlySales: Number(rawData) });
    } catch (error) {
      console.error("월별 매출 조회 실패:", error);
      set({
        error: "월별 매출 정보를 불러오는 데 실패했습니다.",
        isLoading: false,
      });
    }
  },

  getWeeklySales: async (date) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get(`/sales/weekly-sales-summary`, {
        params: { date },
      });
      const rawData = response.data["매출"];
      set({ weeklySales: Number(rawData) });
    } catch (error) {
      console.error("주간 매출 조회 실패:", error);
      set({
        error: "주간 매출 정보를 불러오는 데 실패했습니다.",
        isLoading: false,
      });
    }
  },

  getWeeklySalesByDay: async (date) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get(`/sales/weekly-sales-by-day`, {
        params: { date },
      });
      const rawData = response.data["매출"];
      const formatted = Object.entries(rawData).map(([day, total]) => ({
        x: day,
        y: Number(total),
      }));

      set({ weeklySalesByDay: formatted, isLoading: false });
    } catch (error) {
      console.error("주간 매출 조회 실패:", error);
      set({
        error: "주간 매출 정보를 불러오는 데 실패했습니다.",
        isLoading: false,
      });
    }
  },

  getYearlySalesByMonth: async (year) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get(`/sales/yearly-sales-by-month`, {
        params: { date: year },
      });
      const rawData = response.data["매출"];
      const formatted = Object.entries(rawData).map(([month, total]) => ({
        x: `${month}`,
        y: Number(total),
      }));

      set({ yearlySalesByMonth: formatted, isLoading: false });
    } catch (error) {
      console.error("월별 매출 조회 실패:", error);
      set({
        error: "월별 매출 정보를 불러오는 데 실패했습니다.",
        isLoading: false,
      });
    }
  },
}));
