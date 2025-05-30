import React from "react";
import { Text, View } from "react-native";
import CheckBox from "./CheckBox";
import industryStore from "@/stores/industry.store";
import { checkBoxBundleStyles } from "@/styles/input/checkBox";
import { IndustryType } from "@/types/stores/zustandStore.types";
const CheckBoxBundle = () => {
  const { industry, industryOptions, toggle } = industryStore();
  return (
    <View>
      <Text style={checkBoxBundleStyles.sectionTitle}>가능 품목 리스트</Text>
      <View style={checkBoxBundleStyles.checkboxRow}>
        {industryOptions.map((option) => (
          <CheckBox
            key={option}
            label={option}
            value={
              Array.isArray(industry) &&
              industry.includes(option as IndustryType)
            }
            onValueChange={() =>
              toggle(
                option as IndustryType,
                !(
                  Array.isArray(industry) &&
                  industry.includes(option as IndustryType)
                )
              )
            }
          />
        ))}
      </View>
    </View>
  );
};

export default CheckBoxBundle;
