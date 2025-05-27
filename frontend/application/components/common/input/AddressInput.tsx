import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import AddressModal from "../modal/AddressModal";
import useAddressStore from "@/stores/address.store";
import { AddressInputStyles } from "@/styles/address";

const AddressInput = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { zipcode, address, detailAddress, setAddress } = useAddressStore();
  return (
    <View style={{ gap: 10 }}>
      <Text style={AddressInputStyles.label}>주소</Text>

      <View style={AddressInputStyles.zipRow}>
        <TextInput
          style={[AddressInputStyles.input, { flex: 1 }]}
          value={zipcode}
          placeholder="우편번호"
          editable={false}
        />
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={AddressInputStyles.zipButton}
        >
          <Text style={AddressInputStyles.zipButtonText}>우편번호찾기</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={[AddressInputStyles.input]}
        value={address}
        placeholder="기본 주소"
        editable={false}
      />
      <TextInput
        style={AddressInputStyles.input}
        placeholder="상세주소 입력"
        value={detailAddress}
        onChangeText={(text) => setAddress("detailAddress", text)}
      />
      <AddressModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
};

export default AddressInput;
