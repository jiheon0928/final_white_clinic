import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { CheckBoxProps } from "@/types/checkBox";
import { checkBoxstyles } from "@/styles/input/checkBox";

const CheckBox = ({ label, value, onValueChange }: CheckBoxProps) => (
  <TouchableOpacity
    style={checkBoxstyles.checkboxItem}
    onPress={() => onValueChange(!value)}
    activeOpacity={0.8}
  >
    <View style={checkBoxstyles.checkboxBox}>
      {value && <Text style={checkBoxstyles.checkmark}>✔</Text>}
    </View>
    <Text style={checkBoxstyles.checkboxLabel}>{label}</Text>
  </TouchableOpacity>
);

export default CheckBox;
