import { View, Text, StyleSheet } from "react-native";
type MemoBoxProps = {
  title: string;
  value: string;
};
const MemoBox = ({ title, value }: MemoBoxProps) => {
  return (
    <View>
      <Text>{title}</Text>
      <View style={MemoBoxStyles.requestBox}>
        <Text style={{ color: "#333", fontSize: 14 }}>{value}</Text>
      </View>
    </View>
  );
};
const MemoBoxStyles = StyleSheet.create({
  requestBox: {
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 16,
    padding: 12,
    marginTop: 8,
    marginBottom: 8,
  },
});
export default MemoBox;
