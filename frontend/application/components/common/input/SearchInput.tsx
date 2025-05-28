import Ionicons from "@expo/vector-icons/build/Ionicons";
import { TextInput, View } from "react-native";
import { SearchInputProps } from "@/types/searchInput";
import { searchInputStyles } from "@/styles/searchInputStyle";
const SearchInput = ({ placeholder, onChangeText }: SearchInputProps) => {
  return (
    <View style={searchInputStyles.input}>
      <Ionicons name="search-outline" size={20} color="#222"></Ionicons>
      <TextInput placeholder={placeholder} onChangeText={onChangeText} />
    </View>
  );
};

export default SearchInput;
