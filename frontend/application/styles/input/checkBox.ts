import { StyleSheet } from "react-native";

export const checkBoxstyles = StyleSheet.create({
  checkboxRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    borderRadius: 4,
  },
  checkmark: {
    fontSize: 15,
    color: "#00aaff",
  },
  checkboxLabel: {
    fontSize: 15,
    marginRight: 10,
  },
});

export const checkBoxBundleStyles = StyleSheet.create({
  sectionTitle: {
    fontSize: 15,
    marginLeft: 8,
    marginBottom: 6,
    fontWeight: "bold",
  },
  checkboxRow: {
    padding: 6,
    flexDirection: "row",
  },
});
