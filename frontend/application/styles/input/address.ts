import { StyleSheet } from "react-native";

export const AddressInputStyles = StyleSheet.create({
  label: {
    fontSize: 15,
    marginLeft: 8,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: "#fff",
    width: "100%",
    textAlignVertical: "top",
  },
  zipRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  zipButton: {
    marginLeft: 10,
    backgroundColor: "#eee",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#bbb",
  },
  zipButtonText: {
    fontSize: 15,
  },
});

export const AddressModalStyles = StyleSheet.create({
  closeButton: {
    padding: 10,
    backgroundColor: "#ddd",
    alignItems: "center",
  },
  closeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
