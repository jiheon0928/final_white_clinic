import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
type PageHeaderProps = {
  title: string;
  variant: "default" | "leftBtn" | "rightBtn";
};
const PageHeader = ({ title, variant }: PageHeaderProps) => {
  if (variant === "default") {
    return (
      <View style={pageHeaderStyles.container}>
        <Text style={pageHeaderStyles.text}>{title}</Text>
      </View>
    );
  } else if (variant === "leftBtn") {
    return (
      <View style={pageHeaderStyles.container}>
        <TouchableOpacity style={pageHeaderStyles.button}>
          <Ionicons name="chevron-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={pageHeaderStyles.text}>{title}</Text>
      </View>
    );
  }
};

const pageHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    paddingTop: 5,
    paddingHorizontal: 40,
  },
  button: {
    height: "100%",
    justifyContent: "center",
    marginRight: 8,
  },
  text: {
    flex: 1,
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});
export default PageHeader;
