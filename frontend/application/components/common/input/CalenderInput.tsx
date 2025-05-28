import { Ionicons } from "@expo/vector-icons";
import { Text } from "@react-navigation/elements";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useDateStore from "@/stores/date.store";
import { CalenderInputStyles } from "@/styles/calender";

const CalenderInput = ({ title }: { title: string }) => {
  const [showDate, setShowDate] = useState(false);
  const { date, setDateFromDate } = useDateStore();

  return (
    <>
      <View style={CalenderInputStyles.inputCol}>
        <Text style={CalenderInputStyles.title}>{title}</Text>

        <View style={CalenderInputStyles.inputRow}>
          <TextInput
            style={[CalenderInputStyles.input, { flex: 1 }]}
            value={date}
            editable={false}
          />
          <TouchableOpacity
            onPress={() => setShowDate(true)}
            style={CalenderInputStyles.iconBtn}
          >
            <Ionicons name="calendar-outline" size={22} color="#222" />
          </TouchableOpacity>
        </View>
      </View>
      <DateTimePickerModal
        isVisible={showDate}
        mode="date"
        date={new Date(date)}
        onConfirm={(selected) => {
          setShowDate(false);
          if (selected) {
            setDateFromDate(selected);
          }
        }}
        onCancel={() => setShowDate(false)}
      />
    </>
  );
};

export default CalenderInput;
