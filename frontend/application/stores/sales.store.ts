import { create } from "zustand";

export type ChartDataType = {
  labels: string[];
  datasets: { data: number[] }[];
};

export type MonthlyChartData = Record<string, ChartDataType>;

type ChartKey = "daily" | "weekly" | "monthly";

type SalesState = {
  type: ChartKey;
  selectedMonth: string;
  daily: ChartDataType;
  weekly: ChartDataType;
  monthly: MonthlyChartData;

  setType: (type: ChartKey) => void;
  setDaily: (data: ChartDataType) => void;
  setWeekly: (data: ChartDataType) => void;
  setMonthly: (data: MonthlyChartData) => void;
  setSelectedMonth: (month: string) => void;
};

// 초기 월별 데이터 정의 (선택적으로 더미 값으로 초기화 가능)
const generateEmptyMonthlyData = (): MonthlyChartData => {
  const template: ChartDataType = {
    labels: ["1주", "2주", "3주", "4주"],
    datasets: [{ data: [0, 0, 0, 0] }],
  };

  return Array.from({ length: 12 }, (_, i) => `${i + 1}월`).reduce(
    (acc, month) => {
      acc[month] = template;
      return acc;
    },
    {} as MonthlyChartData
  );
};

const useSalesStore = create<SalesState>((set) => ({
  type: "daily",
  selectedMonth: "1월",
  daily: {
    labels: ["월", "화", "수", "목", "금", "토", "일"],
    datasets: [{ data: Array(7).fill(0) }],
  },
  weekly: {
    labels: ["1주차", "2주차", "3주차", "4주차"],
    datasets: [{ data: [0, 0, 0, 0] }],
  },
  monthly: generateEmptyMonthlyData(),

  setType: (type) => set({ type }),
  setDaily: (data) => set({ daily: data }),
  setWeekly: (data) => set({ weekly: data }),
  setMonthly: (data) => set({ monthly: data }),
  setSelectedMonth: (month) => set({ selectedMonth: month }),
}));

export default useSalesStore;
