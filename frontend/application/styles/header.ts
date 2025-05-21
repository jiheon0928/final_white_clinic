import { StyleSheet } from "react-native";

export const HeaderStyles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  backBtnHeaderLayout: {
    position: "relative",
    width: "100%",
    height: 40,
  },
  iconBtn: {
    position: "absolute",
    top: 4,
    padding: 4,
    zIndex: 1,
  },
  betweenHeaderLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
