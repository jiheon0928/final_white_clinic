import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CheckBox from "./CheckBox";

type CheckBoxBundleProps = {
  ACvalue: boolean;
  onValueChangAC: (val: boolean) => void;
  WSvalue: boolean;
  onValueChangeWS: (val: boolean) => void;
};

const CheckBoxBundle = ({
  ACvalue,
  onValueChangAC,
  WSvalue,
  onValueChangeWS,
}: CheckBoxBundleProps) => {
  return (
    <View>
      <Text style={checkBoxBundleStyles.sectionTitle}>가능 품목 리스트</Text>
      <View style={checkBoxBundleStyles.checkboxRow}>
        <CheckBox
          label="에어컨"
          value={ACvalue}
          onValueChange={onValueChangAC}
        />
        <CheckBox
          label="세탁기"
          value={WSvalue}
          onValueChange={onValueChangeWS}
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
