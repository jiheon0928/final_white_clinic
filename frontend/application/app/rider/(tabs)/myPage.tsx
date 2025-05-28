import React from "react";
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
import { ChartKey, MyPageProps } from "@/types/riderMyPage";
import { riderMyPageStyles } from "@/styles/riderMyPageStyle";
import { chartData } from "@/dummyData/maPagechartData";
import { useSalesChart } from "@/hooks/sales/riderMyPage";
import { handleLogout } from "@/hooks/sales/logout";
import Card from "@/components/common/box/Card";
const screenWidth = Dimensions.get("window").width;
const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(63, 93, 231, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};
const MyPage = ({ name, phone, email, benefit }: MyPageProps) => {
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
  return (
    <Page>
      <BetweenHeader
        title="마이페이지"
        btnName="로그아웃"
        onPress={handleLogout}
      />
      <ScrollView>
        <View style={riderMyPageStyles.container}>
          <Card
            btnName="정보수정"
            pressBtn={() => router.push("/rider/mypage/[id]")}
          >
            <Info value={`이름 : ${name}`} />
            <Info value={`전화번호 : ${phone}`} />
            <Info value={`이메일 : ${email}`} />
            <Info value={`수당률 : ${benefit}`} />
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
