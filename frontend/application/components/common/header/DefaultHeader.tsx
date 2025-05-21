import { StyleSheet, Text, View } from "react-native";

type DefaultHeaderProps = {
  title: string;
};
const DefaultHeader = ({ title }: DefaultHeaderProps) => {
  return (
    <View>
      <Text style={{ borderWidth: 1, textAlign: "center" }}>{title}</Text>
    </View>
  );
};

const defaultHeaderStyles = StyleSheet.create({});

export default DefaultHeader;
