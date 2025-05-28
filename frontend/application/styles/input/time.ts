import { StyleSheet } from "react-native";

export const TimeInputStyles = StyleSheet.create({
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
