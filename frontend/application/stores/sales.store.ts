// store/useSalesStore.ts
import { create } from "zustand";

type ChartDataType = {
  labels: string[];
  datasets: { data: number[] }[];
};

type ChartKey = "daily" | "weekly" | "monthly";

const monthList = Array(12)
  .fill(0)
  .map((_, index) => `${index + 1}월`);

const daysOrder = ["월", "화", "수", "목", "금", "토", "일"];

interface SalesState {
  type: ChartKey;
  daily: ChartDataType;
  weekly: ChartDataType;
  monthly: ChartDataType;
  setType: (type: ChartKey) => void;
  setDaily: (data: ChartDataType) => void;
  setWeekly: (data: ChartDataType) => void;
  setMonthly: (data: ChartDataType) => void;
}

const useSalesStore = create<SalesState>((set) => ({
  type: "daily",
  daily: { labels: daysOrder, datasets: [{ data: Array(7).fill(0) }] },
  weekly: {
    labels: ["1주차", "2주차", "3주차", "4주차"],
    datasets: [{ data: [0, 0, 0, 0] }],
  },
  monthly: { labels: monthList, datasets: [{ data: Array(12).fill(0) }] },
  setType: (type: ChartKey) => set({ type }),
  setDaily: (daily: ChartDataType) => set({ daily }),
  setWeekly: (weekly: ChartDataType) => set({ weekly }),
  setMonthly: (monthly: ChartDataType) => set({ monthly }),
}));

export default useSalesStore;
