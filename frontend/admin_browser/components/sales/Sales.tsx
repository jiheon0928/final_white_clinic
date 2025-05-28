"use client";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory";
import Layout from "../common/Layout";
import { useEffect } from "react";
import { useSalesStore } from "@/store/useSalesStore";

export const Sales = () => {
  const {
    weeklySalesByDay,
    yearlySalesByMonth,
    getWeeklySalesByDay,
    getYearlySalesByMonth,
    getDailySales,
    getWeeklySales,
    getMonthlySales,
    dailySales,
    weeklySales,
    monthlySales,
    isLoading,
    error,
  } = useSalesStore();

  useEffect(() => {
    getWeeklySalesByDay(new Date().toISOString());
    getYearlySalesByMonth(new Date().toISOString());
    getDailySales(new Date().toISOString());
    getWeeklySales(new Date().toISOString());
    getMonthlySales(new Date().toISOString());
  }, []);

  // console.log(weeklySalesByDay.reduce((sum, item) => sum + item.y, 0)); //금주매출
  // console.log(yearlySalesByMonth.reduce((sum, item) => sum + item.y, 0)); //월별매출
  // console.log(weeklySalesByDay.reduce((sum, item) => sum + item.y, 0)); //금주매출
  return (
    <Layout title="매출 현황">
      <div className="grid grid-cols-3 gap-4 mt-3">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800">금일 매출</h3>
          <p className="text-2xl font-bold text-blue-600">{dailySales}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800">금주 매출</h3>
          <p className="text-2xl font-bold text-green-600">{weeklySales}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-800">이번달 매출</h3>
          <p className="text-2xl font-bold text-purple-600">{monthlySales}</p>
        </div>
      </div>
      <h1 className="text-5xl font-bold text-center text-blue-600 mb-4 mt-5">
        주간 매출
      </h1>
      <VictoryChart
        domain={{ x: [0.5, 7.5] }}
        theme={VictoryTheme.clean}
        width={500}
        height={250}
      >
        <VictoryBar data={weeklySalesByDay} />
      </VictoryChart>

      <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-blue-600 to-blue-200 bg-clip-text text-transparent mb-4">
        월간 매출
      </h1>
      <VictoryChart
        domainPadding={{ x: 20 }}
        horizontal
        theme={VictoryTheme.clean}
        width={600}
        height={300}
      >
        <VictoryBar data={yearlySalesByMonth} />
      </VictoryChart>
    </Layout>
  );
};
