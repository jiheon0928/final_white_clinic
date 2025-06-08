import React, { useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { styles } from "@/styles/sales/sales";

const screenWidth = Dimensions.get("window").width;

const monthList = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(63, 93, 231, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

type Props = {
  type: "daily" | "weekly" | "monthly";
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  daily: any;
  weekly: any;
  monthly: Record<string, any>;
  setType: (type: "daily" | "weekly" | "monthly") => void;
};

const RiderSalesChart = ({
  type,
  selectedMonth,
  setSelectedMonth,
  daily,
  weekly,
  monthly,
  setType,
}: Props) => {
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);

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

  const renderTabs = () => (
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

  return (
    <>
      {renderTabs()}
      {renderHeader()}
      {renderChart()}
    </>
  );
};

export default RiderSalesChart;
