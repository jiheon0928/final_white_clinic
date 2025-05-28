import { DefaultBtnStyles } from "@/styles/defaultBtnStyle";
import { Text, TouchableOpacity } from "react-native";

type DefaultBtnProps = {
  onPress: () => void;
  text: string;
};

const DefaultBtn = ({ text, onPress }: DefaultBtnProps) => {
  return (
    <TouchableOpacity style={DefaultBtnStyles.btn} onPress={onPress}>
      <Text style={DefaultBtnStyles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default DefaultBtn;
