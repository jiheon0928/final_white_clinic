import React from "react";
import { StyleProp, TextStyle } from "react-native";

export type CardProps = {
  children: React.ReactNode;
  btnName: string;
  pressBtn: () => void;
};

export type DetailBtnProps = {
  onPress: () => void;
  name: string;
};

export type InputProps = {
  title: string;
  inputStyle?: StyleProp<TextStyle>;
  onChangeText?: (text: string) => void;
};
