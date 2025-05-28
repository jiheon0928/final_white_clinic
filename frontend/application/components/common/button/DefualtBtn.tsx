import { DefaultBtnStyles } from "@/styles/Button";
import { DefaultBtnProps } from "@/types/ui/ui.types";
import { Text, TouchableOpacity } from "react-native";

const DefaultBtn = ({ text, onPress }: DefaultBtnProps) => {
  return (
    <TouchableOpacity style={DefaultBtnStyles.btn} onPress={onPress}>
      <Text style={DefaultBtnStyles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default DefaultBtn;
