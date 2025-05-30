import React, { useState } from "react";
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
import { useAuthStore } from "@/stores/auth.store";
import { logout } from "@/utils/login";

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

type MonthlyChartData = {
  [key: string]: ChartDataType;
};

type ChartKey = "daily" | "weekly" | "monthly";

const chartData: {
  daily: ChartDataType;
  weekly: ChartDataType;
  monthly: MonthlyChartData;
} = {
  daily: {
    labels: [..."월화수목금토일"].map((d) => d),
    datasets: [{ data: [10, 40, 30, 35, 45, 60, 70] }],
  },
  weekly: {
    labels: ["1주차", "2주차", "3주차", "4주차"],
    datasets: [{ data: [20, 40, 80, 50] }],
  },
  monthly: {
    "1월": {
      labels: ["1주", "2주", "3주", "4주"],
      datasets: [{ data: [400, 600, 500, 700] }],
    },
    "2월": {
      labels: ["1주", "2주", "3주", "4주"],
      datasets: [{ data: [300, 550, 450, 600] }],
    },
    "3월": {
      labels: ["1주", "2주", "3주", "4주"],
      datasets: [{ data: [320, 480, 510, 630] }],
    },
    "4월": {
      labels: ["1주", "2주", "3주", "4주"],
      datasets: [{ data: [290, 400, 420, 500] }],
    },
    "5월": {
      labels: ["1주", "2주", "3주", "4주"],
      datasets: [{ data: [500, 520, 510, 530] }],
    },
    "6월": {
      labels: ["1주", "2주", "3주", "4주"],
      datasets: [{ data: [460, 470, 490, 510] }],
    },
    "7월": {
      labels: ["1주", "2주", "3주", "4주"],
      datasets: [{ data: [520, 530, 500, 550] }],
    },
    "8월": {
      labels: ["1주", "2주", "3주", "4주"],
      datasets: [{ data: [600, 630, 620, 610] }],
    },
    "9월": {
      labels: ["1주", "2주", "3주", "4주"],
      datasets: [{ data: [430, 460, 450, 470] }],
    },
    "10월": {
      labels: ["1주", "2주", "3주", "4주"],
      datasets: [{ data: [470, 480, 490, 510] }],
    },
    "11월": {
      labels: ["1주", "2주", "3주", "4주"],
      datasets: [{ data: [550, 530, 520, 510] }],
    },
    "12월": {
      labels: ["1주", "2주", "3주", "4주"],
      datasets: [{ data: [610, 620, 640, 630] }],
    },
  },
};

const monthList = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

const Sales = () => {
  const [type, setType] = useState<ChartKey>("daily");
  const [selectedMonth, setSelectedMonth] = useState("1월");
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);

  const renderChart = () => {
    const data =
      type === "monthly" ? chartData.monthly[selectedMonth] : chartData[type];
    return (
      <BarChart
        data={data}
        width={screenWidth - 32}
        height={420}
        chartConfig={chartConfig}
        fromZero
        showValuesOnTopOfBars
        style={{
          marginVertical: 12,
          borderRadius: 16,
          alignSelf: "center",
        }}
      />
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
      <ScrollView contentContainerStyle={salesStyle.scrollContainer}>
        <View style={salesStyle.tabContainer}>
          {(["daily", "weekly", "monthly"] as ChartKey[]).map((key) => (
            <TouchableOpacity
              key={key}
              onPress={() => {
                setType(key);
                if (key !== "monthly") setShowMonthDropdown(false);
              }}
              style={[
                salesStyle.tabButton,
                type === key && salesStyle.activeTab,
              ]}
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

        {type === "monthly" ? (
          <View style={salesStyle.monthTitleContainer}>
            <Text style={salesStyle.chartTitle}>{`${selectedMonth} 매출`}</Text>
            <Text style={salesStyle.currencyUnit}> 단위:만원</Text>
            <TouchableOpacity
              onPress={() => setShowMonthDropdown((v) => !v)}
              style={[salesStyle.monthToggleSmall]}
            >
              <Text style={{ fontWeight: "bold" }}>{`${selectedMonth} ▼`}</Text>
            </TouchableOpacity>

            {showMonthDropdown && (
              <View style={salesStyle.dropdownOverlay}>
                <View style={salesStyle.monthDropdown}>
                  {monthList.map((month) => (
                    <TouchableOpacity
                      key={month}
                      onPress={() => {
                        setSelectedMonth(month);
                        setShowMonthDropdown(false);
                      }}
                      style={[
                        salesStyle.monthDropdownItem,
                        selectedMonth === month && salesStyle.activeMonthItem,
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
          </View>
        ) : (
          <View style={salesStyle.currencyUnitLayout}>
            <Text style={salesStyle.chartTitle}>
              {type === "daily" ? "일일 매출" : "주간 매출"}
            </Text>
            <Text style={salesStyle.currencyUnit}> 단위:만원</Text>
          </View>
        )}

        {renderChart()}
      </ScrollView>
    </Page>
  );
};

const salesStyle = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  adminBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 35,
    marginTop: 30,
  },
  adminText: {
    fontSize: 16,
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

  monthTitleContainer: {
    position: "relative",
    marginVertical: 8,
    alignItems: "center",
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
