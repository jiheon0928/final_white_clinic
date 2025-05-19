import TabIcon from "@/components/tabbar/TabIcon";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
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
  return (
    <Tabs
      screenOptions={{
        tabBarItemStyle: {
          width: 80,
        },
        tabBarStyle: {
          height: 60,
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
