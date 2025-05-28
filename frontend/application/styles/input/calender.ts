import { StyleSheet } from "react-native";

export const CalenderInputStyles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 15,
    marginLeft: 8,
    marginBottom: 6,
    marginTop: 10,
    fontWeight: "bold",
  },
  inputCol: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },
  iconBtn: {
    padding: 8,
    marginLeft: -36,
    zIndex: 1,
  },
});
