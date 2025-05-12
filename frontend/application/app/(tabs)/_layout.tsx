import TabIcon from "@/components/tabbar/TabIcon";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 80,
          borderTopWidth: 0.5,
          borderTopColor: "#ddd",
          backgroundColor: "#fff",
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        },
      }}
    >
      <Tabs.Screen
        name="waiting"
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon
              iconName="hourglass-outline"
              title="대기"
              size={size}
              color={color}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon
              iconName="time-outline"
              title="진행"
              size={size}
              color={color}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="complete"
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon
              iconName="checkmark-circle-outline"
              title="완료"
              size={size}
              color={color}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="myPage"
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon
              iconName="person-outline"
              title="마이페이지"
              size={size}
              color={color}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
    </Tabs>
  );
}
