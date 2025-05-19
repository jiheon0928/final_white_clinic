import { InputProps } from "@/types/common";
import { Text } from "@react-navigation/elements";
import { StyleSheet, TextInput, View } from "react-native";

const Input = ({ title, onChangeText, inputStyle }: InputProps) => {
  return (
    <View style={inputStyles.container}>
      <Text style={inputStyles.title}>{title}</Text>
      <TextInput
        style={[inputStyles.input, inputStyle]}
        onChangeText={onChangeText}
        multiline={true}
        textAlignVertical="top"
        scrollEnabled={true}
        numberOfLines={4}
      />
    </View>
  );
};

const inputStyles = StyleSheet.create({
  container: {
    width: "100%",
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
