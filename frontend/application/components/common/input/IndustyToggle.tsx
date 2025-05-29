import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { IndustryToggleStyles } from "@/styles/input/industryInput";
import Title from "../text/Title";
import useIndustryStore from "@/stores/industry.store";
const IndustryToggle = () => {
  const { selectedIndustry, setSelectedIndustry, industryOptions } =
    useIndustryStore();

  return (
    <View>
      <Title title="품목" />
      {industryOptions.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            IndustryToggleStyles.option,
            selectedIndustry === option && IndustryToggleStyles.selectedOption,
          ]}
          onPress={() => setSelectedIndustry(option)}
        >
          <Text
            style={
              selectedIndustry === option
                ? IndustryToggleStyles.selectedText
                : IndustryToggleStyles.text
            }
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default IndustryToggle;
