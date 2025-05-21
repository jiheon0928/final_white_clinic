import { Text, View } from "react-native";
import DetailBtn from "../DetailBtn";
import { HeaderStyles } from "@/styles/header";
import { BetweenHeaderProps } from "@/types/headers";

const BetweenHeader = ({ title, btnName, onPress }: BetweenHeaderProps) => {
  return (
    <View style={HeaderStyles.betweenHeaderLayout}>
      <Text style={HeaderStyles.title}>{title}</Text>
      <DetailBtn name={btnName} onPress={onPress} />
    </View>
  );
};

export default BetweenHeader;
