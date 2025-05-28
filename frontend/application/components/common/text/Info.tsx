import { Text, View } from "react-native";

const Info = ({
  value,
  category,
}: {
  value: string | number;
  category?: string;
}) => {
  return (
    <View>
      <Text style={{ fontSize: 14 }}>
        {category ? `${category} : ${value}` : value}
      </Text>
    </View>
  );
};

export default Info;
