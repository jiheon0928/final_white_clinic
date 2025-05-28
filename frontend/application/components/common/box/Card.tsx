import { cardStyles } from "@/styles/card";
import { View } from "react-native";
import { CardProps } from "@/types/common";
import DetailBtn from "../button/DetailBtn";

const Card = ({ children, btnName, pressBtn }: CardProps) => {
  return (
    <View style={cardStyles.card}>
      <DetailBtn
        onPress={pressBtn}
        name={btnName}
        position="absolute"
        top={10}
        right={10}
      />
      {children}
    </View>
  );
};

export default Card;
