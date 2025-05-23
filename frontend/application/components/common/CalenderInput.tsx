import { Ionicons } from "@expo/vector-icons";
import { Text } from "@react-navigation/elements";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type CalenderInputProps = {
  date: Date;
  showDate: boolean;
  setShowDate: (b: boolean) => void;
  onChangeDate: (d: Date) => void;
};

const CalenderInput = ({
  date,
  showDate,
  setShowDate,
  onChangeDate,
}: CalenderInputProps) => {
  const formatDate = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;

  return (
    <>
      <View style={styles.inputCol}>
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="생년월일"
            value={formatDate(date)}
            editable={false}
          />
          <TouchableOpacity
            onPress={() => setShowDate(true)}
            style={styles.iconBtn}
          >
            <Ionicons name="calendar-outline" size={22} color="#222" />
          </TouchableOpacity>
        </View>
      </View>
      <DateTimePickerModal
        isVisible={showDate}
        mode="date"
        date={date}
        onConfirm={(selected) => {
          setShowDate(false);
          if (selected) {
            const newDate = new Date(date);
            newDate.setFullYear(selected.getFullYear());
            newDate.setMonth(selected.getMonth());
            newDate.setDate(selected.getDate());
            onChangeDate(newDate);
          }
        }}
        onCancel={() => setShowDate(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 15,
    marginLeft: 8,
    marginBottom: 6,
    marginTop: 10,
    fontWeight: "bold",
  },
  inputCol: { flexDirection: "column", alignItems: "flex-start" },
  iconBtn: {
    padding: 8,
    marginLeft: -36,
    zIndex: 1,
  },
});

export default CalenderInput;
