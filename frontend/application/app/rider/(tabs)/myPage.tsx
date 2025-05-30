import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import Page from "@/components/common/Page";
import BetweenHeader from "@/components/common/header/BetweenHeader";
import Info from "@/components/common/text/Info";
import { BarChart } from "react-native-chart-kit";
import { riderMyPageStyles } from "@/styles/rider/riderMyPage";
import { chartData } from "@/dummyData/maPagechartData";
import { useSalesChart } from "@/hooks/sales/riderMyPage";
import { handleLogout } from "@/hooks/sales/logout";
import Card from "@/components/common/box/Card";
import { useAuthStore } from "@/stores/auth.store";
import { getRiderById } from "@/utils/riderService";
import { ChartKey } from "@/types/user/rider.types";
import { RiderData } from "@/types/data/riderData";
import { logout } from "@/utils/login";
import { reservationType } from "@/types/data/reservationData";
import { getReservationByRider } from "@/utils/reservationService";
const screenWidth = Dimensions.get("window").width;
const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(63, 93, 231, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};
const MyPage = () => {
  const { user } = useAuthStore();
  const [rider, setRider] = useState<RiderData | null>(null);
  const [reservations, setReservations] = useState<reservationType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const rider = await getRiderById(user.id);
      setRider(rider);
      const reservations = await getReservationByRider(
        user.accessToken as string,
        "완료"
      );
      setReservations(reservations);
    };
    fetchData();
  }, []);

  const {
    type,
    setType,
    selectedMonth,
    setSelectedMonth,
    showMonthDropdown,
    toggleDropdown,
    chart,
  } = useSalesChart();
  const renderChart = () => {
    return (
      <BarChart
        data={chart}
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
  if (!rider) return <Text>라이더가 없습니다</Text>;
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
          </Card>
          <Text style={riderMyPageStyles.chartMainTitle}>매출 현황</Text>
          <View style={riderMyPageStyles.tabContainer}>
            {(["daily", "weekly", "monthly"] as ChartKey[]).map((key) => (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  setType(key);
                  if (key !== "monthly") toggleDropdown();
                }}
                style={[
                  riderMyPageStyles.tabButton,
                  type === key && riderMyPageStyles.activeTab,
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
            <View style={riderMyPageStyles.monthTitleContainer}>
              <Text
                style={riderMyPageStyles.chartTitle}
              >{`${selectedMonth} 매출`}</Text>
              <Text style={riderMyPageStyles.currencyUnit}> 단위:만원</Text>
              <TouchableOpacity
                onPress={toggleDropdown}
                style={[riderMyPageStyles.monthToggleSmall]}
              >
                <Text
                  style={{ fontWeight: "bold" }}
                >{`${selectedMonth} ▼`}</Text>
              </TouchableOpacity>
              {showMonthDropdown && (
                <View style={riderMyPageStyles.dropdownOverlay}>
                  <View style={riderMyPageStyles.monthDropdown}>
                    {Object.keys(chartData.monthly).map((month) => (
                      <TouchableOpacity
                        key={month}
                        onPress={() => {
                          setSelectedMonth(month);
                          toggleDropdown();
                        }}
                        style={[
                          riderMyPageStyles.monthDropdownItem,
                          selectedMonth === month &&
                            riderMyPageStyles.activeMonthItem,
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
            <View style={riderMyPageStyles.currencyUnitLayout}>
              <Text style={riderMyPageStyles.chartTitle}>
                {type === "daily" ? "일일 매출" : "주간 매출"}
              </Text>
              <Text style={riderMyPageStyles.currencyUnit}> 단위:만원</Text>
            </View>
          )}

          {renderChart()}
        </View>
      </ScrollView>
    </Page>
  );
};

export default MyPage;
