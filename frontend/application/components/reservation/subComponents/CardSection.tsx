import DetailBtn from "@/components/common/DetailBtn";
import { cardStyles } from "@/styles/reservation/reservationCard";
import { statusBarStyles } from "@/styles/reservation/statusBar";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

type CardSectionProps = {
  title: string;
  address: string;
  price: number;
  status: string;
};

const CardSection = ({ title, address, price, status }: CardSectionProps) => {
  return (
    <View style={cardStyles.reservationCard}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{title}</Text>
        <DetailBtn onPress={() => router.push("/admin/reservations/[id]")} />
      </View>

      <Text>주소 : {address}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>가격 : {price}</Text>
        <View
          style={[
            statusBarStyles.statusCircle,
            { backgroundColor: getStatusColor(status) },
          ]}
        />
      </View>
    </View>
  );
};

const getStatusColor = (status: string) => {
  if (status === "대기") {
    return "#4299e1";
  } else if (status === "진행") {
    return "#48bb78";
  } else if (status === "완료") {
    return "#a0aec0";
  }
};

export default CardSection;
