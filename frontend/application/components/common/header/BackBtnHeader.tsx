import { HeaderStyles } from "@/styles/header";
import { HeaderProps } from "@/types/headers";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const BackBtnHeader = ({ title }: HeaderProps) => {
  return (
    <View style={HeaderStyles.backBtnHeaderLayout}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={HeaderStyles.iconBtn}
      >
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={HeaderStyles.title}>{title}</Text>
    </View>
  );
};

export default BackBtnHeader;
