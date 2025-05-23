import { router } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type AddressProps = {
  zipCode: string;

  address: string;
  onAddressChange: (text: string) => void;
  detailAddress: string;
  onDetailAddressChange: (text: string) => void;
};

const AddressInput = ({
  zipCode,
  address,
  onAddressChange,

  onDetailAddressChange,
}: AddressProps) => {
  const onZipCodeSearch = () => {
    router.replace("/signup/addressapi");
  };

  return (
    <View>
      <Text style={styles.label}>주소</Text>
      {/* 우편번호 버튼 */}
      <View style={styles.zipRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          value={zipCode}
          placeholder="우편번호"
          editable={false}
        />
        <TouchableOpacity onPress={onZipCodeSearch} style={styles.zipButton}>
          <Text style={styles.zipButtonText}>우편번호찾기</Text>
        </TouchableOpacity>
      </View>
      {/* 기본 주소 */}

      <TextInput
        style={[styles.input, { marginBottom: 10 }]}
        value={address}
        placeholder="기본 주소"
        editable={false}
        onChangeText={onAddressChange}
      />
      {/* 상세 주소 입력 */}
      <TextInput
        style={styles.input}
        placeholder="상세주소 입력"
        onChangeText={onDetailAddressChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    marginLeft: 8,
    marginBottom: 6,
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: "#fff",
    width: "100%",
    textAlignVertical: "top",
  },
  zipRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  zipButton: {
    marginLeft: 10,
    backgroundColor: "#eee",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#bbb",
  },
  zipButtonText: {
    fontSize: 15,
  },
});

export default AddressInput;
