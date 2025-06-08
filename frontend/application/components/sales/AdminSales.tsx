import React, { useEffect, useState, useCallback } from "react";
import { ScrollView } from "react-native";
import Page from "@/components/common/Page";
import BetweenHeader from "@/components/common/header/BetweenHeader";
import { router } from "expo-router";
import { logout } from "@/utils/login";

import useSalesStore, { MonthlyChartData } from "@/stores/sales.store";
import {
  getDailySales,
  getWeeklySalesByDay,
  getWeeklySales,
  getMonthlySales,
  getYearlySalesByMonth,
} from "@/utils/adminSales";
import { styles } from "@/styles/sales/sales";

import {
  SalesSummary,
  SalesTabs,
  SalesHeader,
  SalesBarChart,
} from "./SalesChartComponents";

const monthList = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);
const daysOrder = ["월", "화", "수", "목", "금", "토", "일"];

const defaultWeeklyData = {
  labels: ["1주", "2주", "3주", "4주", "5주"],
  datasets: [{ data: [0, 0, 0, 0, 0] }],
};

const AdminSales = () => {
  const {
    type,
    setType,
    selectedMonth,
    setSelectedMonth,
    daily,
    setDaily,
    weekly,
    setWeekly,
    monthly,
    setMonthly,
  } = useSalesStore();

  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [summaryData, setSummaryData] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0,
  });

  const today = new Date();
  const todayISO = today.toISOString();
  const currentMonthKey = `${today.getMonth() + 1}월`;

  const transformYearlyData = (
    rawData: Record<string, any>
  ): MonthlyChartData => {
    return Object.entries(rawData).reduce((acc, [month, values]) => {
      acc[month] = {
        labels: defaultWeeklyData.labels,
        datasets: [
          {
            data: defaultWeeklyData.labels.map(
              (label) => values[label.replace("주", "주차")] ?? 0
            ),
          },
        ],
      };
      return acc;
    }, {} as MonthlyChartData);
  };

  const fetchSalesData = useCallback(async () => {
    try {
      const [dailyRaw, dailySales, weeklySales, monthlySales, monthlyRaw] =
        await Promise.all([
          getWeeklySalesByDay(todayISO),
          getDailySales(todayISO),
          getWeeklySales(todayISO),
          getMonthlySales(todayISO),
          getYearlySalesByMonth(todayISO),
        ]);

      const orderedDailyData = daysOrder.map((day) => dailyRaw[day] ?? 0);
      setDaily({
        labels: daysOrder,
        datasets: [{ data: orderedDailyData }],
      });

      setSummaryData({
        daily: dailySales,
        weekly: weeklySales,
        monthly: monthlySales,
      });

      const monthlyData = transformYearlyData(monthlyRaw);
      setMonthly(monthlyData);
      setWeekly(monthlyData[currentMonthKey] ?? defaultWeeklyData);
    } catch (error) {
      console.error("매출 데이터 불러오기 오류:", error);
    }
  }, []);

  useEffect(() => {
    fetchSalesData();
  }, [fetchSalesData]);

  return (
    <Page>
      <BetweenHeader
        title="마이페이지"
        btnName="로그아웃"
        onPress={() => {
          logout();
          router.replace("/");
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <SalesSummary summaryData={summaryData} />
        <SalesTabs
          type={type}
          setType={setType}
          setShowMonthDropdown={setShowMonthDropdown}
        />
        <SalesHeader
          type={type}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          showMonthDropdown={showMonthDropdown}
          setShowMonthDropdown={setShowMonthDropdown}
          monthList={monthList}
        />
        <SalesBarChart
          type={type}
          daily={daily}
          weekly={weekly}
          monthly={monthly}
          selectedMonth={selectedMonth}
        />
      </ScrollView>
    </Page>
  );
};

export default AdminSales;
