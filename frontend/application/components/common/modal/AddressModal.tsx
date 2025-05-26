import React from "react";
import { Modal, View, StyleSheet, Pressable, Text } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";

import useAddressStore from "@/stores/address.store";

type Props = {
  visible: boolean;
  onClose: () => void;
};

const AddressModal = ({ visible, onClose }: Props) => {
  const { setAddress } = useAddressStore();

  const handleMessage = (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      setAddress(data.zonecode, data.address);
      onClose();
    } catch (e) {
      console.warn("주소 파싱 실패", e);
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1 }}>
        <Pressable onPress={onClose} style={addressModalStyles.closeButton}>
          <Text style={addressModalStyles.closeText}>닫기</Text>
        </Pressable>

        <WebView
          source={{ uri: "https://address-new-9951.vercel.app/" }}
          onMessage={handleMessage}
        />
      </View>
    </Modal>
  );
};

const addressModalStyles = StyleSheet.create({
  closeButton: {
    padding: 10,
    backgroundColor: "#ddd",
    alignItems: "center",
  },
  closeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddressModal;
