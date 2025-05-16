import Ionicons from "@expo/vector-icons/build/Ionicons";
import { StyleSheet, TextInput, View } from "react-native";

type SearchInputProps = {
  placeholder: string;
};
const SearchInput = ({ placeholder }: SearchInputProps) => {
  return (
    <View style={style.input}>
      <Ionicons name="search-outline" size={20} color="#222"></Ionicons>
      <TextInput placeholder={placeholder} />
    </View>
  );
};
const style = StyleSheet.create({
  input: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 10,
    textDecorationLine: "none",
  },
});
export default SearchInput;
