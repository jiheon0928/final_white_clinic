export type MyPageProps = {
  name: string;
  phone: string;
  email: string;
  benefit: string;
};

export type ChartDataType = {
  labels: string[];
  datasets: { data: number[] }[];
};

export type MonthlyChartData = {
  [key: string]: ChartDataType;
};

export type ChartKey = "daily" | "weekly" | "monthly";
