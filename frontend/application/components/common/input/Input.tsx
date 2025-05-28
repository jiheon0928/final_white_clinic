import { inputStyles } from "@/styles/InputStyle";
import { InputProps } from "@/types/common";
import { Text, TextInput, View } from "react-native";

const Input = ({
  title,
  onChangeText,
  numberOfLines = 1,
  value,
}: InputProps) => {
  const lineHeight = 20;
  const calculatedHeight = numberOfLines * lineHeight + 20;

  return (
    <View style={inputStyles.container}>
      <Text style={inputStyles.title}>{title}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        multiline
        numberOfLines={numberOfLines}
        style={[inputStyles.input, { height: calculatedHeight }]}
        scrollEnabled={true}
        textAlignVertical="top"
      />
    </View>
  );
};

export default Input;
