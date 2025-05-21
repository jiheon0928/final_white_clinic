import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

type CheckBoxProps = {
  label: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
};

const CheckBox = ({ label, value, onValueChange }: CheckBoxProps) => (
  <TouchableOpacity
    style={styles.checkboxItem}
    onPress={() => onValueChange(!value)}
    activeOpacity={0.8}
  >
    <View style={styles.checkboxBox}>
      {value && <Text style={styles.checkmark}>✔</Text>}
    </View>
    <Text style={styles.checkboxLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  checkboxRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    borderRadius: 4,
  },
  checkmark: {
    fontSize: 14,
    color: "#00aaff",
  },
  checkboxLabel: {
    fontSize: 14,
    marginRight: 10,
  },
});

export default CheckBox;
