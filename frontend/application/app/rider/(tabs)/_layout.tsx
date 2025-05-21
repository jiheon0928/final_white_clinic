import TabIcon from "@/components/common/TabIcon";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const riderTabs: {
  name: string;
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
}[] = [
  {
    name: "waiting",
    title: "대기",
    iconName: "hourglass-outline",
  },
  {
    name: "progress",
    title: "진행",
    iconName: "time-outline",
  },
  {
    name: "completed",
    title: "완료",
    iconName: "checkmark-circle-outline",
  },
  {
    name: "myPage",
    title: "마이페이지",
    iconName: "person-outline",
  },
];
const TabLayout = () => {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        tabBarItemStyle: {
          width: 80,
        },
        tabBarStyle: {
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom || (Platform.OS === "android" ? 20 : 0),
          paddingTop: 10,
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      {riderTabs.map(({ name, title, iconName }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            tabBarIcon: ({ color, size }) => (
              <TabIcon
                iconName={iconName}
                title={title}
                size={size}
                color={color}
              />
            ),
            tabBarLabel: () => null,
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabLayout;
