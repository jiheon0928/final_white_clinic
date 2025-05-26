import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";

type ToggleInputProps = {
  boxStyle?: StyleProp<ViewStyle>;
  options: string[] | number[];
  setSelected: (option: string | number) => void;
  selected: string | number;
  title: string;
};

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

const toggleInputStyles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    marginLeft: 8,
    marginBottom: 6,
    fontWeight: "bold",
  },
  dropdownContainer: {
    position: "relative", // dropdownBox 기준이 되는 부모
  },
  buttonBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",
    width: "100%",
  },
  buttonText: {
    fontSize: 15,
  },
  dropdownBox: {
    position: "absolute", // ✅ 절대 위치
    top: "100%", // 버튼 바로 아래
    left: 0,
    right: 0,
    marginTop: 4,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    elevation: 3,
    zIndex: 999,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  dropdownText: {
    fontSize: 15,
  },
});

export default ToggleInput;
