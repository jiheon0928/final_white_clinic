import { TabIconProps } from "@/types/tabBar";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

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

const tabIconStyles = StyleSheet.create({
  text: {
    fontSize: 11,
    marginTop: 4,
    width: 80,
    textAlign: "center",
  },
});
export default TabIcon;
