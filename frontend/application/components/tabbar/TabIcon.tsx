import { TabIconProps } from "@/types/type";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

const TabIcon = ({ iconName, title, size, color }: TabIconProps) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Ionicons name={iconName} size={size} color={color} />
      <Text
        style={{
          fontSize: 11,
          color,
          marginTop: 4,
          width: 80,
          textAlign: "center",
        }}
        numberOfLines={1}
      >
        {title}
      </Text>
    </View>
  );
};

export default TabIcon;
