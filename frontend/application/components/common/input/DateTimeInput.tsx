import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type DateTimeInputProps = {
  date: Date;
  showDate: boolean;
  showTime: boolean;
  setShowDate: (b: boolean) => void;
  setShowTime: (b: boolean) => void;
  onChangeDate: (d: Date) => void;
};

const DateTimeInput = ({
  date,
  showDate,
  showTime,
  setShowDate,
  setShowTime,
  onChangeDate,
}: DateTimeInputProps) => {
  const formatDate = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;

  const formatTime = (d: Date) =>
    `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(
      2,
      "0"
    )}`;

  return (
    <View style={styles.inputWrap}>
      {/* 방문 날짜 */}
      <View style={styles.inputCol}>
        <Text style={styles.title}>방문 날짜</Text>
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

      {/* 방문 시간 */}
      <View style={styles.inputCol}>
        <Text style={styles.title}>방문 시간</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={formatTime(date)}
            editable={false}
          />
          <TouchableOpacity
            onPress={() => setShowTime(true)}
            style={styles.icon}
          >
            <Ionicons name="time-outline" size={22} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 날짜 선택기 */}
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

      {/* 시간 선택기 */}
      <DateTimePickerModal
        isVisible={showTime}
        mode="time"
        date={date}
        onConfirm={(selected) => {
          setShowTime(false);
          if (selected) {
            const newDate = new Date(date);
            newDate.setHours(selected.getHours());
            newDate.setMinutes(selected.getMinutes());
            onChangeDate(newDate);
          }
        }}
        onCancel={() => setShowTime(false)}
        is24Hour={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrap: {
    flexDirection: "row",
    flexWrap: "nowrap", // 🔥 한 줄 유지
    gap: 10,
    justifyContent: "space-between",
    width: "100%",
  },
  inputCol: {
    flex: 1,
    maxWidth: "48%", // 🔥 두 칼럼 나란히 보이게
  },
  title: {
    fontSize: 15,
    marginLeft: 8,
    marginBottom: 6,
    marginTop: 10,
    fontWeight: "bold",
  },
  inputRow: {
    position: "relative",
    width: "100%",
    marginBottom: 12,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: "#fff",
    paddingRight: 40,
  },
  icon: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -11 }],
    zIndex: 1,
  },
});

export default DateTimeInput;
