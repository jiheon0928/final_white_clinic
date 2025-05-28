import { TimeInputStyles } from "@/styles/input/time";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useTimeStore from "@/stores/time.store";

const TimeInput = () => {
  const { time, setTime } = useTimeStore();
  const [showTime, setShowTime] = useState(false);

  return (
    <View style={TimeInputStyles.inputWrap}>
      <View style={TimeInputStyles.inputCol}>
        <Text style={TimeInputStyles.title}>방문 시간</Text>
        <View style={TimeInputStyles.inputRow}>
          <TextInput
            style={TimeInputStyles.input}
            value={time}
            editable={false}
          />
          <TouchableOpacity
            onPress={() => setShowTime(true)}
            style={TimeInputStyles.icon}
          >
            <Ionicons name="time-outline" size={22} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <DateTimePickerModal
        isVisible={showTime}
        mode="time"
        date={new Date(time)}
        onConfirm={(selected) => {
          setShowTime(false);
          if (selected) {
            setTime(selected);
          }
        }}
        onCancel={() => setShowTime(false)}
        is24Hour={true}
      />
    </View>
  );
};

export default TimeInput;
