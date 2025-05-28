import React from "react";
import { Modal, View, Pressable, Text } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import useAddressStore from "@/stores/address.store";
import { AddressModalStyles } from "@/styles/address";
import { AddressModalProps } from "@/types/address";

const AddressModal = ({ visible, onClose }: AddressModalProps) => {
  const { setAddress } = useAddressStore();

  const handleMessage = (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      setAddress("zipcode", data.zonecode);
      setAddress("address", data.address);
      onClose();
    } catch (e) {
      console.warn("주소 파싱 실패", e);
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1 }}>
        <Pressable onPress={onClose} style={AddressModalStyles.closeButton}>
          <Text style={AddressModalStyles.closeText}>닫기</Text>
        </Pressable>

        <WebView
          source={{ uri: "https://address-new-9951.vercel.app/" }}
          onMessage={handleMessage}
        />
      </View>
    </Modal>
  );
};

export default AddressModal;
