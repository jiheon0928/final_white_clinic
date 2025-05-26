import styles from "@/styles/EditReservation/EditReservationStyle";
import React from "react";
import { Text, View } from "react-native";
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
      <Text style={styles.sectionTitle}>가능 품목 리스트</Text>
      <View style={styles.checkboxRow}>
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

export default CheckBoxBundle;
