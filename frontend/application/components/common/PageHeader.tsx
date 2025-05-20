import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DetailBtn from "./DetailBtn";
type PageHeaderProps = {
  title: string;
  variant: "default" | "leftBtn" | "rightBtn";
  onBtnPress?: () => void;
  detailBtnName?: string;
};
const PageHeader = ({
  title,
  variant,
  onBtnPress,
  detailBtnName,
}: PageHeaderProps) => {
  if (variant === "default") {
    return (
      <View>
        <Text style={pageHeaderStyles.defaultText}>{title}</Text>
      </View>
    );
  } else if (variant === "leftBtn") {
    return (
      <View style={pageHeaderStyles.leftBtnHeader}>
        <TouchableOpacity onPress={onBtnPress}>
          <Ionicons name="chevron-back" size={30} color="black" />
        </TouchableOpacity>

        <Text style={pageHeaderStyles.leftHeaderText}>{title}</Text>
      </View>
    );
  } else if (variant === "rightBtn") {
    return (
      <View style={pageHeaderStyles.rightBtnHeader}>
        <Text style={pageHeaderStyles.rightHeaderText}>{title}</Text>
        <DetailBtn
          name={detailBtnName}
          onPress={onBtnPress}
          position="absolute"
          right={0}
        />
      </View>
    );
  }
};

const pageHeaderStyles = StyleSheet.create({
  defaultText: {
    fontSize: 25,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  leftBtnHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 40,
  },
  leftHeaderText: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  rightBtnHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
  rightHeaderText: {
    fontSize: 25,
    fontWeight: "bold",
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
  },
});
export default PageHeader;
