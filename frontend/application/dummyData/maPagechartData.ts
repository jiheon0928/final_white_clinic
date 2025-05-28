import { ChartDataType, MonthlyChartData } from "@/types/riderMyPage";

export const chartData: {
  daily: ChartDataType;
  weekly: ChartDataType;
  monthly: MonthlyChartData;
} = {
  daily: {
    labels: [..."월화수목금토일"].map((d) => d),
    datasets: [{ data: [10, 40, 30, 35, 45, 60, 70] }],
  },
  weekly: {
    labels: ["1주차", "2주차", "3주차", "4주차"],
    datasets: [{ data: [20, 40, 80, 50] }],
  },
  monthly: {
    "1월": {
      labels: ["1주", "2주", "3주", "4주"],
      datasets: [{ data: [400, 600, 500, 700] }],
    },
    "2월": {
      labels: ["1주", "2주", "3주", "4주"],
      datasets: [{ data: [300, 550, 450, 600] }],
    },
    "3월": {
      labels: ["1주", "2주", "3주", "4주"],
      datasets: [{ data: [320, 480, 510, 630] }],
    },
    "4월": {
      labels: ["1주", "2주", "3주", "4주"],
      datasets: [{ data: [290, 400, 420, 500] }],
    },
    "5월": {
      labels: ["1주", "2주", "3주", "4주"],
      datasets: [{ data: [500, 520, 510, 530] }],
    },
    "6월": {
      labels: ["1주", "2주", "3주", "4주"],
      datasets: [{ data: [460, 470, 490, 510] }],
    },
    "7월": {
      labels: ["1주", "2주", "3주", "4주"],
      datasets: [{ data: [520, 530, 500, 550] }],
    },
    "8월": {
      labels: ["1주", "2주", "3주", "4주"],
      datasets: [{ data: [600, 630, 620, 610] }],
    },
    "9월": {
      labels: ["1주", "2주", "3주", "4주"],
      datasets: [{ data: [430, 460, 450, 470] }],
    },
    "10월": {
      labels: ["1주", "2주", "3주", "4주"],
      datasets: [{ data: [470, 480, 490, 510] }],
    },
    "11월": {
      labels: ["1주", "2주", "3주", "4주"],
      datasets: [{ data: [550, 530, 520, 510] }],
    },
    "12월": {
      labels: ["1주", "2주", "3주", "4주"],
      datasets: [{ data: [610, 620, 640, 630] }],
    },
  },
};
