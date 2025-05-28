import { StyleSheet } from "react-native";

export const detailBtnStyles = StyleSheet.create({
  btn: {
    padding: 7,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
});

export const DefaultBtnStyles = StyleSheet.create({
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
