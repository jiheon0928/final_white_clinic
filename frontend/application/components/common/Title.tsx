import { Text } from "react-native";

const Title = ({ title }: { title: string }) => {
  return <Text style={{ fontSize: 18, fontWeight: "bold" }}>{title}</Text>;
};

export default Title;
