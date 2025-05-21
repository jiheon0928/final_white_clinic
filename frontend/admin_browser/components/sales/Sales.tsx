"use client";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory";
import Layout from "../common/Layout";

export const Sales = () => {
  const dailySalesData = [
    { x: "월요일", y: 10 },
    { x: "화요일", y: 50 },
    { x: "수요일", y: 30 },
    { x: "목요일", y: 40 },
    { x: "금요일", y: 20 },
    { x: "토요일", y: 60 },
    { x: "일요일", y: 70 },
  ];
  const weeklySalesData = [
    { x: "1주차", y: 20 },
    { x: "2주차", y: 50 },
    { x: "3주차", y: 80 },
    { x: "4주차", y: 40 },
  ];

  return (
    <Layout title="매출 현황">
      <div className="grid grid-cols-3 gap-4 mt-3">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800">일일 매출</h3>
          <p className="text-2xl font-bold text-blue-600">850,000원</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800">금주 매출</h3>
          <p className="text-2xl font-bold text-green-600">5,250,000원</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-800">이번달 매출</h3>
          <p className="text-2xl font-bold text-purple-600">22,450,000원</p>
        </div>
      </div>
      <h1 className="text-5xl font-bold text-center text-blue-600 mb-4 mt-5">
        일일 매출
      </h1>
      <VictoryChart
        domain={{ x: [0.5, 7.5] }}
        theme={VictoryTheme.clean}
        width={500}
        height={250}
      >
        <VictoryBar animate={{ duration: 1000 }} data={dailySalesData} />
      </VictoryChart>

      <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-blue-600 to-blue-200 bg-clip-text text-transparent mb-4">
        주간 매출
      </h1>
      <VictoryChart
        domainPadding={{ x: 20 }}
        horizontal
        theme={VictoryTheme.clean}
        width={600}
        height={300}
      >
        <VictoryBar animate={{ duration: 1000 }} data={weeklySalesData} />
      </VictoryChart>
    </Layout>
  );
};
