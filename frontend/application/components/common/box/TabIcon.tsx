import { tabIconStyles } from "@/styles/tabIconStyle";
import { TabIconProps } from "@/types/ui/ui.types";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

const TabIcon = ({ iconName, title, size, color }: TabIconProps) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Ionicons name={iconName} size={size} color={color} />
      <Text style={[tabIconStyles.text, { color }]} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
};

export default TabIcon;
