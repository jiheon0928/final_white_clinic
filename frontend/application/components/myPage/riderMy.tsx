import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
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
import useSalesStore from "@/stores/sales.store";
import {
  getRiderWeeklySales,
  getRiderYearlySalesByMonth,
} from "@/utils/riderSales";

import RiderSalesChart from "./RiderSalesChart.component";

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

  useEffect(() => {
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
          const result: Record<string, any> = {};
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

    const fetchData = async () => {
      const rider = await getRiderById(user.id);
      setRider(rider);
      const reservations = await getReservationByRider(
        user.accessToken as string,
        "완료"
      );
    };

    fetchSalesData();
    fetchData();
  }, []);

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
            <Info value={`이번달 순수익:`} />
          </Card>
        </View>

        <RiderSalesChart
          type={type}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          daily={daily}
          weekly={weekly}
          monthly={monthly}
          setType={setType}
        />
      </ScrollView>
    </Page>
  );
};

export default RiderMyPage;
