import Card from "@/components/common/Card";
import { commonStyles } from "@/styles/common";
import { statusBarStyles } from "@/styles/reservation/statusBar";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

type CardSectionProps = {
  id: string;
  title: string;
  address: string;
  price: number;
  status: string;
};

const ReservationCard = ({
  id,
  title,
  address,
  price,
  status,
}: CardSectionProps) => {
  return (
    <Card
      btnName="상세 정보"
      pressBtn={() => {
        router.push(`/admin/reservations/${id}`);
      }}
    >
      <Text style={commonStyles.title}>{title}</Text>
      <Text style={commonStyles.subtitle}>주소 : {address}</Text>
      <Text style={commonStyles.subtitle}>가격 : {price}</Text>
      <View
        style={[
          statusBarStyles.statusCircle,
          { backgroundColor: getStatusColor(status) },
          { position: "absolute", bottom: 20, right: 20 },
        ]}
      />
    </Card>
  );
};

const getStatusColor = (status: string) => {
  if (status === "대기") {
    return commonStyles.waiting.backgroundColor;
  } else if (status === "진행") {
    return commonStyles.progress.backgroundColor;
  } else if (status === "완료") {
    return commonStyles.completed.backgroundColor;
  }
};

export default ReservationCard;
