import TabIcon from "@/components/tabbar/TabIcon";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const adminTabs: {
  name: string;
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
}[] = [
  {
    name: "reservations",
    title: "예약",
    iconName: "calendar-outline",
  },
  {
    name: "riders",
    title: "기사",
    iconName: "people-outline",
  },
  {
    name: "sales",
    title: "매출",
    iconName: "cash-outline",
  },
];

const AdminLayout = () => {
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
      {adminTabs.map(({ name, title, iconName }) => (
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

export default AdminLayout;
