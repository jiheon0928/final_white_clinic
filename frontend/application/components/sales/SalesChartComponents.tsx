import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { styles } from "@/styles/sales/sales";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(63, 93, 231, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const defaultWeeklyData = {
  labels: ["1주", "2주", "3주", "4주", "5주"],
  datasets: [{ data: [0, 0, 0, 0, 0] }],
};

export const SalesSummary = ({
  summaryData,
}: {
  summaryData: { daily: number; weekly: number; monthly: number };
}) => {
  const labels = ["금일", "금주", "이번달"] as const;
  const keys = ["daily", "weekly", "monthly"] as const;

  return (
    <View style={styles.summaryContainer}>
      {labels.map((label, i) => (
        <View key={label} style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>{`${label} 매출`}</Text>
          <Text style={styles.summaryValue}>
            {summaryData[keys[i]].toLocaleString()}원
          </Text>
        </View>
      ))}
    </View>
  );
};

export const SalesTabs = ({
  type,
  setType,
  setShowMonthDropdown,
}: {
  type: string;
  setType: (type: "daily" | "weekly" | "monthly") => void;
  setShowMonthDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
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
  );
};

export const SalesHeader = ({
  type,
  selectedMonth,
  setSelectedMonth,
  showMonthDropdown,
  setShowMonthDropdown,
  monthList,
}: {
  type: string;
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  showMonthDropdown: boolean;
  setShowMonthDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  monthList: string[];
}) => {
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

export const SalesBarChart = ({
  type,
  daily,
  weekly,
  monthly,
  selectedMonth,
}: {
  type: string;
  daily: any;
  weekly: any;
  monthly: Record<string, any>;
  selectedMonth: string;
}) => {
  const chartData =
    type === "monthly"
      ? monthly[selectedMonth] ?? defaultWeeklyData
      : type === "daily"
      ? daily
      : weekly;

  return (
    <BarChart
      data={chartData}
      width={screenWidth - 32}
      height={420}
      chartConfig={chartConfig}
      fromZero
      showValuesOnTopOfBars
      style={styles.chartStyle}
    />
  );
};
