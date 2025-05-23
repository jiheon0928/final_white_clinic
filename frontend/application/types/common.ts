import React from "react";
import { StyleProp, TextStyle } from "react-native";

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

export type InputProps = {
  title: string;
  value?: string;

  onChangeText?: (text: string) => void;
  numberOfLines?: number;
  containerStyle?: StyleProp<TextStyle>;
};
