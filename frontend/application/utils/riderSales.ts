import api from "./api";

export const getRiderWeeklySales = async (
  date: string
): Promise<Record<string, number>> => {
  try {
    const response = await api.get("/user/rider/weekly", {
      params: { date },
    });

    const raw = response.data["totalSales"];
    console.log("주간데이터", response.data); // 예: { 월: 1000, 화: 2000, ... }

    return raw; // ← 객체 그대로 반환해야 함
  } catch (error) {
    console.error(`Failed to fetch weekly sales for ${date}:`, error);
    throw new Error("주간 매출 정보를 불러오는 데 실패했습니다.");
  }
};

export const getRiderWeeklySalesByDay = async (
  date: string
): Promise<Record<string, number>> => {
  try {
    const response = await api.get("/user/rider/monthly", {
      params: { date },
    });
    const raw = response.data["netProfit"] as Record<string, number>;

    return raw;
  } catch (error) {
    console.error(`Failed to fetch weekly sales by day for ${date}:`, error);
    throw new Error("주간 매출 일별 정보를 불러오는 데 실패했습니다.");
  }
};

export const getRiderYearlySalesByMonth = async (
  year: string
): Promise<Record<string, number>> => {
  try {
    const response = await api.get("/user/rider/yearly", {
      params: { date: year },
    });

    const raw = response.data as Record<string, number>;

    return raw;
  } catch (error) {
    console.error(`Failed to fetch yearly sales by month for ${year}:`, error);
    throw new Error("연간 매출 정보를 불러오는 데 실패했습니다.");
  }
};
