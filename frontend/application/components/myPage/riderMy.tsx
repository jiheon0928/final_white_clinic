import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import Page from "@/components/common/Page";
import BetweenHeader from "@/components/common/header/BetweenHeader";
import Info from "@/components/common/text/Info";
import Card from "@/components/common/box/Card";
import { useAuthStore } from "@/stores/auth.store";
import { getRiderById } from "@/utils/riderService";
import { RiderData } from "@/types/data/riderData";
import { logout } from "@/utils/login";

import { getReservationByRider } from "@/utils/reservationService";
import { riderMyPageStyles } from "@/styles/rider/riderMyPage";
import useSalesStore, { MonthlyChartData } from "@/stores/sales.store";
import {
  getRiderWeeklySales,
  getRiderWeeklySalesByDay,
  getRiderYearlySalesByMonth,
} from "@/utils/riderSales";

import { BarChart } from "react-native-chart-kit";
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

const RiderMyPage = () => {
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

  const { user } = useAuthStore();
  const [rider, setRider] = useState<RiderData | null>(null);

  const [showMonthDropdown, setShowMonthDropdown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      getRiderWeeklySales(new Date().toISOString());

      const rider = await getRiderById(user.id);
      setRider(rider);
      const reservations = await getReservationByRider(
        user.accessToken as string,
        "완료"
      );
    };

    const fetchSalesData = async () => {
      try {
        const dailyRaw = await getRiderWeeklySales(new Date().toISOString());
        const orderedDailyData = daysOrder.map((day) => dailyRaw[day] ?? 0);
        setDaily({
          labels: daysOrder,
          datasets: [{ data: orderedDailyData }],
        });

        const monthlyRaw = await getRiderYearlySalesByMonth(
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

    fetchSalesData();

    fetchData();
  }, []);

  if (!rider) return <Text>라이더가 없습니다</Text>;

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
      <BetweenHeader title="마이페이지" btnName="로그아웃" onPress={logout} />
      <ScrollView>
        <View style={riderMyPageStyles.container}>
          <Card
            btnName="정보수정"
            pressBtn={() => router.push("/rider/editMy")}
          >
            <Info value={`이름 : ${rider.name}`} />
            <Info value={`전화번호 : ${rider.phone}`} />
            <Info value={`이메일 : ${rider.email}`} />
            <Info value={`수당률 : ${rider.benefit.benefitType * 100}%`} />
            <Info value={`이번달 순수익:`} />
          </Card>
        </View>

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
    marginTop: 10,
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

export default RiderMyPage;
