import AddressInput from "@/components/common/AddressInput";
import CheckBoxBundle from "@/components/common/CheckBoxBundle";
import DefaultBtn from "@/components/common/DefualtBtn";
import BackBtnHeader from "@/components/common/header/BackBtnHeader";
import Input from "@/components/common/Input";
import Page from "@/components/common/Page";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

const Signup = () => {
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [showDate, setShowDate] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [detail, setDetail] = useState("");
  const [itemWasher, setItemWasher] = useState(false);
  const [itemAircon, setItemAircon] = useState(false);
  const { address2, zipcode2 } = useLocalSearchParams();

  const [addressField, setAddressField] = useState(
    typeof address2 === "string" ? address2 : ""
  );
  const [zipcodeField, setZipcodeField] = useState(
    typeof zipcode2 === "string" ? zipcode2 : ""
  );

  const clickAddress = () => {
    router.replace("/signup/addressapi");
  };
  const onChangeDate = (selectedDate: Date | undefined) => {
    setShowDate(false);
    if (selectedDate) {
      const yyyy = selectedDate.getFullYear();
      const mm = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const dd = String(selectedDate.getDate()).padStart(2, "0");
      setBirth(`${yyyy}-${mm}-${dd}`);
    }
  };

  return (
    <Page>
      <BackBtnHeader title="회원가입" />
      <Input title="이름" onChangeText={setName} />
      <Input title="전화번호" onChangeText={setPhone} />
      <Input title="이메일" onChangeText={setEmail} numberOfLines={4} />
      <AddressInput
        zipCode={zipcodeField}
        address={addressField}
        onAddressChange={setAddress}
        detailAddress={detail}
        onDetailAddressChange={setDetail}
      />
      <CheckBoxBundle
        ACvalue={itemAircon}
        onValueChangAC={setItemAircon}
        WSvalue={itemWasher}
        onValueChangeWS={setItemWasher}
      />

      <DefaultBtn text="완료" onPress={() => router.replace("/")} />
    </Page>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  backBtn: {
    position: "absolute",
    top: 36,
    left: 16,
    zIndex: 10,
    padding: 4,
    paddingTop: 28,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 18,
    paddingTop: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 15,
    backgroundColor: "#fff",
    width: "100%",
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  iconBtn: {
    marginLeft: -36,
    padding: 8,
    zIndex: 1,
  },
  label: {
    fontSize: 15,
    marginBottom: 6,
    color: "#222",
    alignSelf: "flex-start",
    marginTop: 6,
  },
  zipBtn: {
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 8,
  },
  zipBtnText: {
    color: "#222",
    fontSize: 13,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    width: "100%",
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  checkBoxSquare: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 4,
    marginRight: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  checkedBox: {
    borderColor: "#6DD6FF",
    backgroundColor: "#e6f7ff",
  },
  checkLabel: {
    fontSize: 15,
    color: "#222",
  },
  submitBtn: {
    backgroundColor: "#6DD6FF",
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  submitBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Signup;
