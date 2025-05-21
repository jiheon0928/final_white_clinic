import Card from "@/components/common/Card";
import Info from "@/components/common/Info";
import StatusPill from "@/components/common/StatusPill";
import Title from "@/components/common/Title";
import { router } from "expo-router";
import React from "react";

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
      <Title title={title} />
      <Info value={`주소 : ${address}`} />
      <Info value={`가격 : ${price}`} />
      <StatusPill status={status} position="absolute" bottom={20} right={20} />
    </Card>
  );
};

export default ReservationCard;
