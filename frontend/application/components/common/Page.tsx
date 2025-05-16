import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Page = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: "#ffffff",
      }}
    >
      {children}
    </SafeAreaView>
  );
};

export default Page;
