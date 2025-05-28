import { ViewStyle } from "react-native";

import { StyleProp } from "react-native";

export type ToggleInputProps = {
  boxStyle?: StyleProp<ViewStyle>;
  options: string[] | number[];
  setSelected: (option: string | number) => void;
  selected: string | number;
  title: string;
};
