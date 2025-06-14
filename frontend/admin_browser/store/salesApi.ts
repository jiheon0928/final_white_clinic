import api from "@/utils/api/api";

export type DataPoint = { x: string; y: number };

/**
 * Fetch daily sales for a specific date (YYYY-MM-DD).
 */
export async function fetchDailySales(date: string): Promise<number> {
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
}

/**
 * Fetch total sales for a specific month (YYYY-MM).
 */
export async function fetchMonthlySales(date: string): Promise<number> {
  try {
    const response = await api.get("/sales/monthly-sales", {
      params: { date },
    });
    const raw = response.data["totalSales"];

    return Number(raw);
  } catch (error) {
    console.error(`Failed to fetch monthly sales for ${date}:`, error);
    throw new Error("월별 매출 정보를 불러오는 데 실패했습니다.");
  }
}

/**
 * Fetch total sales for the week containing the given date (YYYY-MM-DD).
 */
export async function fetchWeeklySales(date: string): Promise<number> {
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
}

/**
 * Fetch daily breakdown of sales for the week containing the given date.
 * Returns an array of { x: day, y: amount }.
 */
export async function fetchWeeklySalesByDay(
  date: string
): Promise<DataPoint[]> {
  try {
    const response = await api.get("/sales/weekly-sales-by-day", {
      params: { date },
    });
    const raw = response.data["totalCommission"] as Record<string, number>;


    return Object.entries(raw).map(([day, total]) => ({
      x: day,
      y: Number(total),
    }));
  } catch (error) {
    console.error(`Failed to fetch weekly sales by day for ${date}:`, error);
    throw new Error("주간 매출 일별 정보를 불러오는 데 실패했습니다.");
  }
}

/**
 * Fetch monthly breakdown of sales for the given year (YYYY).
 * Returns an array of { x: month, y: amount }.
 */
 
export async function fetchYearlySalesByMonth(year: string): Promise<DataPoint[]> {
  try {
    const response = await api.get("/sales/yearly-sales-by-month", {
      params: { date: year },
    });

    const raw = response.data as Record<
      string,
      { 합산가격: number; [key: string]: any }
    >;

    // VictoryBar 차트에 맞게 변환
    return Object.entries(raw).map(([month, data]) => ({
      x: month,               // ex) "1월"
      y: Number(data.합산가격) // ex) 123456
    }));
  } catch (error) {
    console.error(`Failed to fetch yearly sales by month for ${year}:`, error);
    throw new Error("연간 매출 정보를 불러오는 데 실패했습니다.");
  }
}
