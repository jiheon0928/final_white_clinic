import { Ionicons } from "@expo/vector-icons";

export type TabIconProps = {
  iconName: keyof typeof Ionicons.glyphMap;
  title: string;
  size: number;
  color: string;
};
