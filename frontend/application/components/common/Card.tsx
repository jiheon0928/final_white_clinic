import { cardStyles } from "@/styles/reservation/reservationCard";
import { View } from "react-native";
import { CardProps } from "@/types/common";
import DetailBtn from "./DetailBtn";

const Card = ({ children, btnName, pressBtn }: CardProps) => {
  return (
    <View style={cardStyles.card}>
      <DetailBtn onPress={pressBtn} name={btnName} />
      {children}
    </View>
  );
};

export default Card;
