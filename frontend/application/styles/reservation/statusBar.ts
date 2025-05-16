import { StyleSheet } from "react-native";

export const statusBarStyles = StyleSheet.create({
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
  },
  statusButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
    marginHorizontal: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },

  statusCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
