import React, { useEffect } from "react";
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
import { getWeeklySalesByDay, getYearlySalesByMonth } from "@/utils/sales";
import useSalesStore from "@/stores/sales.store";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(63, 93, 231, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const Sales = () => {
  const { type, daily, weekly, monthly, setType, setDaily, setMonthly } =
    useSalesStore();

  const monthList = monthly.labels;
  const daysOrder = daily.labels;

  useEffect(() => {
    const fetchDaily = async () => {
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

    const fetchMonthly = async () => {
      try {
        const raw = await getYearlySalesByMonth(new Date().toISOString());
        console.log("raw", raw);

        const data = monthList.map(
          (month) => raw[month as keyof typeof raw] ?? 0
        );

        setMonthly({
          labels: monthList,
          datasets: [{ data }],
        });
      } catch (error) {
        console.error("월별 매출 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchDaily();
    fetchMonthly();
  }, []);

  const renderChart = () => {
    const data =
      type === "monthly" ? monthly : type === "daily" ? daily : weekly;

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
          {(["daily", "weekly", "monthly"] as const).map((key) => (
            <TouchableOpacity
              key={key}
              onPress={() => setType(key)}
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

        <View style={salesStyle.currencyUnitLayout}>
          <Text style={salesStyle.chartTitle}>
            {type === "daily"
              ? "일일 매출"
              : type === "weekly"
              ? "주간 매출"
              : "월간 매출"}
          </Text>
          <Text style={salesStyle.currencyUnit}> 단위:만원</Text>
        </View>

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
});

export default Sales;
