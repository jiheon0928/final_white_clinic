import { formatTime } from "@/app/hooks/input";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type TimeInputProps = {
  time: string;
  onChangeTime: (d: string) => void;
};

const TimeInput = ({ time, onChangeTime }: TimeInputProps) => {
  const [showTime, setShowTime] = useState(false);

  return (
    <View style={styles.inputWrap}>
      <View style={styles.inputCol}>
        <Text style={styles.title}>방문 시간</Text>
        <View style={styles.inputRow}>
          <TextInput style={styles.input} value={time} editable={false} />
          <TouchableOpacity
            onPress={() => setShowTime(true)}
            style={styles.icon}
          >
            <Ionicons name="time-outline" size={22} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <DateTimePickerModal
        isVisible={showTime}
        mode="time"
        date={new Date(`2000-01-01T${time}`)}
        onConfirm={(selected) => {
          setShowTime(false);
          if (selected) {
            onChangeTime(formatTime(selected));
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
    flexWrap: "nowrap",
    gap: 10,
    justifyContent: "space-between",
    width: "100%",
  },
  inputCol: {
    flex: 1,
    maxWidth: "100%",
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

export default TimeInput;
