import React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type CardProps = {
  children: React.ReactNode;
  btnName: string;
  pressBtn: () => void;
};

export type DetailBtnProps = {
  onPress?: () => void;
  name?: string;
  position?: "absolute" | "relative";
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
};

export type DefaultBtnProps = {
  onPress: () => void;
  text: string;
};

export type InputProps = {
  title: string;
  value?: string;
  onChangeText?: (text: string) => void;
  numberOfLines?: number;
  containerStyle?: StyleProp<TextStyle>;
};

export type TabIconProps = {
  iconName: keyof typeof Ionicons.glyphMap;
  title: string;
  size: number;
  color: string;
};

export type CheckBoxProps = {
  label: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
};

export type ToggleInputProps = {
  boxStyle?: StyleProp<ViewStyle>;
  options: string[] | number[];
  setSelected: (option: string | number) => void;
  selected: string | number;
  title: string;
};

export type SearchInputProps = {
  placeholder: string;
  onChangeText: (text: string) => void;
};
