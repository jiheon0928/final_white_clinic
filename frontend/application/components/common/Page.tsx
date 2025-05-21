import { SafeAreaView, View } from "react-native";

const Page = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 50,
        backgroundColor: "#ffffff",
      }}
    >
      {children}
    </SafeAreaView>
  );
};

export default Page;
