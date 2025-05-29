import { StyleSheet } from "react-native";

export const IndustryToggleStyles = StyleSheet.create({
  option: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
  },
  selectedOption: {
    backgroundColor: "grey",
  },
  text: {
    color: "#000",
  },
  selectedText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
