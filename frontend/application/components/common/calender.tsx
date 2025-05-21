import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
type CalenderProps = {
  placeholder: string;
  value: string;
  onChangeDate: (selectedDate: Date | undefined) => void;
  date: Date;
  showDate: boolean;
  setShowDate: (showDate: boolean) => void;
};
const Calender = ({
  placeholder,
  value,
  onChangeDate,
  date,
  showDate,
  setShowDate,
}: CalenderProps) => {
  return (
    <View>
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder={placeholder}
          value={value}
          editable={false}
        />
        <TouchableOpacity
          onPress={() => setShowDate(true)}
          style={styles.iconBtn}
        >
          <Ionicons name="calendar-outline" size={22} color="#222" />
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={showDate}
        mode="date"
        onConfirm={onChangeDate}
        onCancel={() => setShowDate(false)}
        date={date}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  iconBtn: {
    marginLeft: -36,
    padding: 8,
    zIndex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 15,
    backgroundColor: "#fff",
    width: "100%",
    marginBottom: 10,
  },
});
export default Calender;
