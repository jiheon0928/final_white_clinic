import { Pressable, Text } from "react-native";

type DetailBtnProps = { onPress: () => void };
const DetailBtn = ({ onPress }: DetailBtnProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 5,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
      }}
    >
      <Text>상세 정보</Text>
    </Pressable>
  );
};

export default DetailBtn;
