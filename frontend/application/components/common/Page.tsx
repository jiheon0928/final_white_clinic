import { SafeAreaView } from "react-native";

const Page = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "column",
        paddingHorizontal: 10,
        paddingTop: 50,
        backgroundColor: "#ffffff",
        gap: 15,
      }}
    >
      {children}
    </SafeAreaView>
  );
};

export default Page;
