import { StyleSheet, Text, TouchableOpacity } from "react-native";

type DefaultBtnProps = {
  onPress: () => void;
  text: string;
};

const DefaultBtn = ({ text, onPress }: DefaultBtnProps) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
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

  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DefaultBtn;
