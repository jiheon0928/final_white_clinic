import api from "./api";

export const getDailySales = async (date: string): Promise<number> => {
  try {
    const response = await api.get("/sales/sales-by-date", {
      params: { date },
    });
    const raw = response.data["totalSales"];
    return Number(raw);
  } catch (error) {
    console.error(`Failed to fetch daily sales for ${date}:`, error);
    throw new Error("일일 매출 정보를 불러오는 데 실패했습니다.");
  }
};

export const getMonthlySales = async (date: string): Promise<number> => {
  try {
    const response = await api.get("/sales/monthly-sales", {
      params: { date },
    });
    const raw = response.data["totalSales"];
    console.log(response);
    return Number(raw);
  } catch (error) {
    console.error(`Failed to fetch monthly sales for ${date}:`, error);
    throw new Error("월별 매출 정보를 불러오는 데 실패했습니다.");
  }
};

export const getWeeklySales = async (date: string): Promise<number> => {
  try {
    const response = await api.get("/sales/weekly-sales-summary", {
      params: { date },
    });
    const raw = response.data["totalSales"];

    return Number(raw);
  } catch (error) {
    console.error(`Failed to fetch weekly sales for ${date}:`, error);
    throw new Error("주간 매출 정보를 불러오는 데 실패했습니다.");
  }
};

export const getWeeklySalesByDay = async (
  date: string
): Promise<Record<string, number>> => {
  try {
    const response = await api.get("/sales/weekly-sales-by-day", {
      params: { date },
    });
    const raw = response.data["totalSales"] as Record<string, number>;

    return raw;
  } catch (error) {
    console.error(`Failed to fetch weekly sales by day for ${date}:`, error);
    throw new Error("주간 매출 일별 정보를 불러오는 데 실패했습니다.");
  }
};

export const getYearlySalesByMonth = async (
  year: string
): Promise<Record<string, number>> => {
  try {
    const response = await api.get("/sales/yearly-sales-by-month", {
      params: { date: year },
    });
    const raw = response.data["totalSales"] as Record<string, number>;
    console.log("1월~12월", raw);
    return raw;
  } catch (error) {
    console.error(`Failed to fetch yearly sales by month for ${year}:`, error);
    throw new Error("연간 매출 정보를 불러오는 데 실패했습니다.");
  }
};
