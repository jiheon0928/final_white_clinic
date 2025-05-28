import { toggleInputStyles } from "@/styles/input/toggle";
import { ToggleInputProps } from "@/types/ui/ui.types";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
const ToggleInput = ({
  boxStyle,
  options,
  setSelected,
  title,
  selected,
}: ToggleInputProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const toggleDropdown = () => {
    setShowOptions((prev) => !prev);
  };
  return (
    <View style={toggleInputStyles.wrapper}>
      <Text style={toggleInputStyles.label}>{title}</Text>
      <View style={toggleInputStyles.dropdownContainer}>
        {/* 토글 버튼 */}
        <TouchableOpacity
          onPress={toggleDropdown}
          style={[toggleInputStyles.buttonBox, boxStyle]}
        >
          <Text style={toggleInputStyles.buttonText}>{String(selected)}</Text>
          <Ionicons name="chevron-down" size={20} color="#000" />
        </TouchableOpacity>
        {/* 옵션 리스트 - 절대 위치로 띄움 */}
        {showOptions && (
          <View style={[toggleInputStyles.dropdownBox, boxStyle]}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={toggleInputStyles.dropdownItem}
                onPress={() => {
                  setShowOptions(false);
                  setSelected(option);
                }}
              >
                <Text style={toggleInputStyles.dropdownText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};
export default ToggleInput;
