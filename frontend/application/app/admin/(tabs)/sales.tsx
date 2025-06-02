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
import { getMonthlySales, getWeeklySalesByDay } from "@/utils/sales";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(63, 93, 231, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

type ChartDataType = {
  labels: string[];
  datasets: { data: number[] }[];
};

type MonthlyChartData = Record<string, ChartDataType>;

type ChartKey = "daily" | "weekly" | "monthly";

const monthList = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);

const daysOrder = ["월", "화", "수", "목", "금", "토", "일"];

const chartData: {
  daily: ChartDataType;
  weekly: ChartDataType;
  monthly: MonthlyChartData;
} = {
  daily: {
    labels: daysOrder,
    datasets: [{ data: [10, 40, 30, 35, 45, 60, 70] }],
  },
  weekly: {
    labels: ["1주차", "2주차", "3주차", "4주차"],
    datasets: [{ data: [20, 40, 80, 50] }],
  },
  monthly: monthList.reduce((acc, month) => {
    acc[month] = {
      labels: ["1주", "2주", "3주", "4주"],
      datasets: [{ data: Array(4).fill(Math.floor(Math.random() * 700)) }],
    };
    return acc;
  }, {} as MonthlyChartData),
};

const Sales = () => {
  const [type, setType] = useState<ChartKey>("daily");
  const [selectedMonth, setSelectedMonth] = useState("1월");
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [daily, setDaily] = useState<ChartDataType>(chartData.daily);

  useEffect(() => {
    const fetchDailyData = async () => {
      try {
        const raw = await getWeeklySalesByDay(new Date().toISOString());
        const orderedData = daysOrder.map((day) => raw[day] ?? 0);
        setDaily({
          labels: daysOrder,
          datasets: [{ data: orderedData }],
        });
      } catch (error) {
        console.error("일일 매출 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    const fetchMonthlyData = async () => {
      try {
        await getMonthlySales(new Date().toISOString());
      } catch (error) {
        console.error("월별 매출 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchDailyData();
    fetchMonthlyData();
  }, []);

  const renderChart = () => {
    const data =
      type === "monthly"
        ? chartData.monthly[selectedMonth]
        : type === "daily"
        ? daily
        : chartData.weekly;

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
        <View style={styles.tabContainer}>
          {(["daily", "weekly", "monthly"] as ChartKey[]).map((key) => (
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
    marginBottom: 50,
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
});

export default Sales;
