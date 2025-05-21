import { StyleSheet, Text, TouchableOpacity } from "react-native";

type DefaultBtnProps = {
  onPress: () => void;
  text: string;
};
const DefaultBtn = ({ onPress, text }: DefaultBtnProps) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#6DD6FF",
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DefaultBtn;
