import { HeaderStyles } from "@/styles/header";
import { HeaderProps } from "@/types/headers";
import { Text, View } from "react-native";

const DefaultHeader = ({ title }: HeaderProps) => {
  return (
    <View style={{ height: 40 }}>
      <Text style={HeaderStyles.title}>{title}</Text>
    </View>
  );
};

export default DefaultHeader;
