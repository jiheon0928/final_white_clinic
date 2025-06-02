import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import Page from "@/components/common/Page";
import BetweenHeader from "@/components/common/header/BetweenHeader";
import { router } from "expo-router";
import { logout } from "@/utils/login";
import {
  getWeeklySalesByDay,
  getYearlySalesByMonth,
  getDailySales,
  getWeeklySales,
  getMonthlySales,
} from "@/utils/adminSales";
import useSalesStore, { MonthlyChartData } from "@/stores/sales.store";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(63, 93, 231, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const monthList = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);
const daysOrder = ["월", "화", "수", "목", "금", "토", "일"];

const Sales = () => {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dailyRaw = await getWeeklySalesByDay(new Date().toISOString());
        const orderedDailyData = daysOrder.map((day) => dailyRaw[day] ?? 0);
        setDaily({
          labels: daysOrder,
          datasets: [{ data: orderedDailyData }],
        });

        const [dailySales, weeklySales, monthlySales] = await Promise.all([
          getDailySales(new Date().toISOString()),
          getWeeklySales(new Date().toISOString()),
          getMonthlySales(new Date().toISOString()),
        ]);

        setSummaryData({
          daily: dailySales,
          weekly: weeklySales,
          monthly: monthlySales,
        });

        const monthlyRaw = await getYearlySalesByMonth(
          new Date().toISOString()
        );

        const transformYearlyDataToMonthlyChartData = (
          rawData: Record<string, any>
        ) => {
          const result: MonthlyChartData = {};
          for (const [month, values] of Object.entries(rawData)) {
            result[month] = {
              labels: ["1주", "2주", "3주", "4주", "5주"],
              datasets: [
                {
                  data: [
                    values["1주차"] ?? 0,
                    values["2주차"] ?? 0,
                    values["3주차"] ?? 0,
                    values["4주차"] ?? 0,
                    values["5주차"] ?? 0,
                  ],
                },
              ],
            };
          }
          return result;
        };

        const monthlyData = transformYearlyDataToMonthlyChartData(monthlyRaw);
        setMonthly(monthlyData);

        const today = new Date();
        const monthKey = `${today.getMonth() + 1}월`;

        // monthlyData에서 오늘 월 데이터 꺼내서 weekly에 세팅
        if (monthlyData[monthKey]) {
          setWeekly(monthlyData[monthKey]);
        } else {
          setWeekly({
            labels: ["1주", "2주", "3주", "4주", "5주"],
            datasets: [{ data: [0, 0, 0, 0, 0] }],
          });
        }
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchData();
  }, []);

  const renderSummary = () => (
    <View style={styles.summaryContainer}>
      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>금일 매출</Text>
        <Text style={styles.summaryValue}>
          {summaryData.daily.toLocaleString()}원
        </Text>
      </View>
      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>금주 매출</Text>
        <Text style={styles.summaryValue}>
          {summaryData.weekly.toLocaleString()}원
        </Text>
      </View>
      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>이번달 매출</Text>
        <Text style={styles.summaryValue}>
          {summaryData.monthly.toLocaleString()}원
        </Text>
      </View>
    </View>
  );

  const renderChart = () => {
    const data =
      type === "monthly"
        ? monthly[selectedMonth]
        : type === "daily"
        ? daily
        : weekly;

    return (
      <BarChart
        data={data}
        width={screenWidth - 32}
        height={420}
        chartConfig={chartConfig}
        fromZero
        showValuesOnTopOfBars
        style={styles.chartStyle}
      />
    );
  };

  const renderHeader = () => {
    const title =
      type === "daily"
        ? "일일 매출"
        : type === "weekly"
        ? "주간 매출"
        : `${selectedMonth} 매출`;

    return (
      <View
        style={
          type === "monthly"
            ? styles.monthTitleContainer
            : styles.currencyUnitLayout
        }
      >
        <Text style={styles.chartTitle}>{title}</Text>
        <Text style={styles.currencyUnit}> 단위:만원</Text>

        {type === "monthly" && (
          <>
            <TouchableOpacity
              onPress={() => setShowMonthDropdown((prev) => !prev)}
              style={styles.monthToggleSmall}
            >
              <Text style={{ fontWeight: "bold" }}>{`${selectedMonth} ▼`}</Text>
            </TouchableOpacity>

            {showMonthDropdown && (
              <View style={styles.dropdownOverlay}>
                <View style={styles.monthDropdown}>
                  {monthList.map((month) => (
                    <TouchableOpacity
                      key={month}
                      onPress={() => {
                        setSelectedMonth(month);
                        setShowMonthDropdown(false);
                      }}
                      style={[
                        styles.monthDropdownItem,
                        selectedMonth === month && styles.activeMonthItem,
                      ]}
                    >
                      <Text
                        style={
                          selectedMonth === month
                            ? { color: "#fff", fontSize: 12 }
                            : undefined
                        }
                      >
                        {month}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </>
        )}
      </View>
    );
  };

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
        {renderSummary()}
        <View style={styles.tabContainer}>
          {(["daily", "weekly", "monthly"] as const).map((key) => (
            <TouchableOpacity
              key={key}
              onPress={() => {
                setType(key);
                if (key !== "monthly") setShowMonthDropdown(false);
              }}
              style={[styles.tabButton, type === key && styles.activeTab]}
            >
              <Text>
                {key === "daily"
                  ? "일일 매출"
                  : key === "weekly"
                  ? "주간 매출"
                  : "월간 매출"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {renderHeader()}
        {renderChart()}
      </ScrollView>
    </Page>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  tabButton: {
    paddingBottom: 10,
    marginBottom: 40,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: "#3f51b5",
  },
  chartStyle: {
    marginVertical: 12,
    borderRadius: 16,
    alignSelf: "center",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  currencyUnitLayout: {
    position: "relative",
  },
  currencyUnit: {
    position: "absolute",
    left: -3,
    fontSize: 12,
    top: 6,
  },
  monthTitleContainer: {
    position: "relative",
    marginVertical: 8,
    alignItems: "center",
  },
  monthToggleSmall: {
    position: "absolute",
    right: 16,
    top: -3,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    alignItems: "center",
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  dropdownOverlay: {
    position: "absolute",
    top: 28,
    right: 16,
    zIndex: 1000,
  },
  monthDropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 6,
    backgroundColor: "#fff",
  },
  monthDropdownItem: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  activeMonthItem: {
    backgroundColor: "#3f51b5",
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 30,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3f51b5",
  },
});

export default Sales;
