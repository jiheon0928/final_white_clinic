"use client";
import { useState, useEffect } from "react";
import Layout from "../common/Layout";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory";
import {
  fetchDailySales,
  fetchWeeklySales,
  fetchMonthlySales,
  fetchWeeklySalesByDay,
  fetchYearlySalesByMonth,
  DataPoint,
} from "@/store/salesApi";

export default function Sales() {
  const [dailySales, setDailySales] = useState<number>(0);
  const [weeklySales, setWeeklySales] = useState<number>(0);
  const [monthlySales, setMonthlySales] = useState<number>(0);
  const [weeklySalesByDay, setWeeklySalesByDay] = useState<DataPoint[]>([]);
  const [yearlySalesByMonth, setYearlySalesByMonth] = useState<DataPoint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const todayIso = new Date().toISOString();
  const thisYear = new Date().getFullYear().toString();

  useEffect(() => {
    async function loadAll() {
      setIsLoading(true);
      setError(null);
      try {
        const [day, week, month, weekByDay, yearByMonth] = await Promise.all([
          fetchDailySales(todayIso),
          fetchWeeklySales(todayIso),
          fetchMonthlySales(todayIso),
          fetchWeeklySalesByDay(todayIso),
          fetchYearlySalesByMonth(thisYear),
        ]);

        setDailySales(day);
        setWeeklySales(week);
        setMonthlySales(month);
        setWeeklySalesByDay(weekByDay);
        setYearlySalesByMonth(yearByMonth);
      } catch (e: Error | unknown) {
        const errorMessage = e instanceof Error ? e.message : "데이터 로드 중 오류가 발생했습니다.";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }

    loadAll();
  }, [todayIso, thisYear]);

  if (isLoading) {
    return (
      <Layout title="매출 현황">
        <p>로딩 중...</p>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="매출 현황">
        <p className="text-red-500">Error: {error}</p>
      </Layout>
    );
  }

  return (
    <Layout title="매출 현황">
      <div></div>

      <div className="grid grid-cols-3 gap-4 mt-3">
        <Card title="금일 매출" value={dailySales} color="blue" />
        <Card title="금주 매출" value={weeklySales} color="green" />
        <Card title="이번달 매출" value={monthlySales} color="purple" />
      </div>
      <SectionHeader title="주간 매출" />
      <VictoryChart
        domain={{ x: [0.5, 7.5] }}
        theme={VictoryTheme.clean}
        width={500}
        height={250}
      >
        <VictoryBar data={weeklySalesByDay} />
      </VictoryChart>
      <SectionHeader title="월간 매출" horizontal />
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
}

type CardProps = {
  title: string;
  value: number;
  color: "blue" | "green" | "purple";
};

function Card({ title, value, color }: CardProps) {
  const bg = {
    blue: "bg-blue-100",
    green: "bg-green-100",
    purple: "bg-purple-100",
  }[color];
  const text = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
  }[color];
  const titleColor = {
    blue: "text-blue-800",
    green: "text-green-800",
    purple: "text-purple-800",
  }[color];

  return (
    <div className={`${bg} p-4 rounded-lg`}>
      <h3 className={`font-semibold ${titleColor}`}>{title}</h3>
      <p className={`text-2xl font-bold ${text}`}>{value}</p>
    </div>
  );
}

type SectionHeaderProps = {
  title: string;
  horizontal?: boolean;
};

function SectionHeader({ title, horizontal }: SectionHeaderProps) {
  return (
    <h1
      className={`text-5xl font-bold text-center mb-4 mt-5 ${
        horizontal
          ? "bg-gradient-to-r from-blue-600 to-blue-200 bg-clip-text text-transparent"
          : "text-blue-600"
      }`}
    >
      {title}
    </h1>
  );
}
