import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type DateTimeInputProps = {
  date: Date;
  showDate: boolean;
  setShowDate: (b: boolean) => void;
  onChangeDate: (d: Date) => void;
};

const DateInput = ({
  date,
  showDate,
  setShowDate,
  onChangeDate,
}: DateTimeInputProps) => {
  const formatDate = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;

  return (
    <View style={styles.inputWrap}>
      <View style={styles.inputCol}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={formatDate(date)}
            editable={false}
          />
          <TouchableOpacity
            onPress={() => setShowDate(true)}
            style={styles.icon}
          >
            <Ionicons name="calendar-outline" size={22} color="#333" />
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
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrap: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
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
  icon: {
    padding: 8,
    marginLeft: -36,
    zIndex: 1,
  },
});

export default DateInput;
