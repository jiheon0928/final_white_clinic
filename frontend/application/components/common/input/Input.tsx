import { InputProps } from "@/types/common";
import { Text } from "@react-navigation/elements";
import { StyleSheet, TextInput, View } from "react-native";

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

const inputStyles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10,
  },
  title: {
    fontSize: 15,
    marginLeft: 8,
    marginBottom: 6,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: "#fff",
    width: "100%",
    textAlignVertical: "top",
  },
});

export default Input;
