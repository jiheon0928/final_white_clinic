import { router } from "expo-router";
import { Alert, View } from "react-native";
import { WebView } from "react-native-webview";
import { useAddressStore } from "@/stores/useAddressStore"; // zustand store import

const AddressSearchScreen = () => {
  const { setZipCode, setAddress } = useAddressStore();

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      const fullAddress = data.address;
      const zonecode = data.zonecode;

      setZipCode(zonecode);
      setAddress(fullAddress);

      Alert.alert("주소 선택됨", `${zonecode} ${fullAddress}`);

      router.replace("/admin/CreateReservation/CreateReservationPage");
    } catch (e) {
      console.error("주소 데이터 처리 중 오류:", e);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: "https://add-api-nifd.vercel.app" }}
        onMessage={handleMessage}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default AddressSearchScreen;
