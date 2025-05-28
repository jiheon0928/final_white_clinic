import { detailBtnStyles } from "@/styles/detailBtnStyle";
import { DetailBtnProps } from "@/types/common";
import { Text, TouchableOpacity } from "react-native";

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

export default DetailBtn;
