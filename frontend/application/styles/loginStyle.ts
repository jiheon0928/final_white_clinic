import { StyleSheet } from "react-native";

const LOGO_SIZE = 170;
export const loginStyles = StyleSheet.create({
  logoContainer: {
    position: "absolute",
    alignSelf: "center",
    objectFit: "cover",
    width: LOGO_SIZE,
    height: LOGO_SIZE,
  },
  logoPlaceholder: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    backgroundColor: "#ddd",
    borderRadius: 3,
  },
});
