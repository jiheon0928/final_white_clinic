import { Ionicons } from "@expo/vector-icons";

export const adminTabs: {
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
