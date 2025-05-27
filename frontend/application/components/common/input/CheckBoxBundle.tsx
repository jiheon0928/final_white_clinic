import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CheckBox from "./CheckBox";
import industryStore from "@/stores/industry.store";

const CheckBoxBundle = () => {
  const { industry, toggle } = industryStore();
  return (
    <View>
      <Text style={checkBoxBundleStyles.sectionTitle}>가능 품목 리스트</Text>
      <View style={checkBoxBundleStyles.checkboxRow}>
        <CheckBox
          label="에어컨"
          value={industry.includes("에어컨")}
          onValueChange={() => toggle("에어컨", !industry.includes("에어컨"))}
        />
        <CheckBox
          label="세탁기"
          value={industry.includes("세탁기")}
          onValueChange={() => toggle("세탁기", !industry.includes("세탁기"))}
        />
      </View>
    </View>
  );
};

const checkBoxBundleStyles = StyleSheet.create({
  sectionTitle: {
    fontSize: 15,
    marginLeft: 8,
    marginBottom: 6,
    fontWeight: "bold",
  },
  checkboxRow: {
    padding: 6,
    flexDirection: "row",
  },
});

export default CheckBoxBundle;
