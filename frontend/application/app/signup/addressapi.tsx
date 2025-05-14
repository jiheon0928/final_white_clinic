import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, View } from "react-native";
import { WebView } from "react-native-webview";

const AddressSearchScreen = () => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedZonecode, setSelectedZonecode] = useState(""); // ✅ 우편번호 상태 추가

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      const fullAddress = data.address;
      const zonecode = data.zonecode;

      setSelectedAddress(fullAddress);
      setSelectedZonecode(zonecode); // ✅ 우편번호 저장
      Alert.alert("주소 선택됨", `${zonecode} ${fullAddress}`);

      router.push({
        pathname: "/signup",
        params: {
          address2: fullAddress,
          zipcode2: zonecode, // ✅ 파라미터로 전달
        },
      });
    } catch (e) {
      console.error("주소 데이터 처리 중 오류:", e);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: "https://add-api-uk5q.vercel.app" }}
        onMessage={handleMessage}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default AddressSearchScreen;
