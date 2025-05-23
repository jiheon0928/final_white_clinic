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

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(63, 81, 181, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const chartData = {
  daily: {
    labels: [..."월화수목금토일"].map((d) => d),
    datasets: [{ data: [10, 40, 30, 35, 45, 60, 70] }],
  },
  weekly: {
    labels: ["1주차", "2주차", "3주차", "4주차"],
    datasets: [{ data: [20, 40, 80, 50] }],
  },
  monthly: {
    labels: ["1월", "2월", "3월", "4월", "5월"],
    datasets: [{ data: [200, 300, 250, 400, 450] }],
  },
};

type ChartDataType = {
  labels: string[];
  datasets: { data: number[] }[];
};

type ChartKey = keyof typeof chartData;

const Sales = () => {
  const [type, setType] = useState<ChartKey>("daily");

  const renderChart = () => {
    const data: ChartDataType = {
      labels: [...chartData[type].labels],
      datasets: chartData[type].datasets.map((d) => ({ data: [...d.data] })),
    };
    return (
      <BarChart
        data={data}
        width={screenWidth - 70}
        height={520}
        chartConfig={chartConfig}
        fromZero
        showValuesOnTopOfBars
        style={salesStyle.chart}
      />
    );
  };

  return (
    <Page>
      <ScrollView contentContainerStyle={salesStyle.container}>
        <View style={salesStyle.header}>
          <Text style={salesStyle.pageTitle}>매출 페이지</Text>
        </View>

        <View style={salesStyle.adminBox}>
          <Text style={salesStyle.adminText}>ㅇㅇㅇ 관리자</Text>
        </View>

        <View style={salesStyle.tabContainer}>
          {["daily", "weekly", "monthly"].map((key) => (
            <TouchableOpacity
              key={key}
              onPress={() => setType(key as ChartKey)}
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

        <Text style={salesStyle.chartTitle}>
          {type === "daily"
            ? "일일 매출"
            : type === "weekly"
            ? "주간 매출"
            : "월간 매출"}
        </Text>
        {renderChart()}
      </ScrollView>
    </Page>
  );
};

const salesStyle = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  adminBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
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
    paddingBottom: 4,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: "#3f51b5",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
    textAlign: "center",
  },
  chart: {
    marginVertical: 12,
    borderRadius: 16,
    marginLeft: 0,
  },
});

export default Sales;
