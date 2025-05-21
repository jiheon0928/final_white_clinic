import { DetailBtnProps } from "@/types/common";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const DetailBtn = ({
  onPress,
  name,
  position,
  top,
  right,
  bottom,
}: DetailBtnProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      style={[
        detailBtnStyles.btn,
        { position: position, top: top, right: right, bottom: bottom },
      ]}
    >
      <Text>{name}</Text>
    </TouchableOpacity>
  );
};

const detailBtnStyles = StyleSheet.create({
  btn: {
    padding: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",

    zIndex: 1,
  },
});

export default DetailBtn;
