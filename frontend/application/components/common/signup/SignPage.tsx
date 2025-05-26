import React, { useState } from "react";
import { ScrollView } from "react-native";
import Input from "../input/Input";
import BackBtnHeader from "../header/BackBtnHeader";
import AddressInput from "../input/AddressInput";
import Page from "../Page";
import CheckBoxBundle from "../input/CheckBoxBundle";
import useSignupStore from "@/stores/signup.store";
import DefaultBtn from "../button/DefualtBtn";
import { router } from "expo-router";
import useIndustryStore from "@/stores/industry.store";
import useAddressStore from "@/stores/address.store";

const SignPage = () => {
  const { user, setUserField, resetUser } = useSignupStore();
  const { industry, toggle, resetIndustry } = useIndustryStore();
  const { zipcode, address, detailAddress, setDetailAddress, resetAddress } =
    useAddressStore();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const signupInputFields = [
    { title: "이름", key: "name" },
    { title: "전화번호", key: "phone" },
    { title: "이메일", key: "email" },
  ] as const;

  return (
    <Page>
      <BackBtnHeader title="회원가입" />
      {signupInputFields.map(({ title, key }) => (
        <Input
          key={key}
          title={title}
          value={user[key]}
          onChangeText={(text) => setUserField(key, text)}
        />
      ))}
      <CheckBoxBundle
        ACvalue={industry.includes("에어컨")}
        WSvalue={industry.includes("세탁기")}
        onValueChangAC={(value) => toggle("에어컨", value)}
        onValueChangeWS={(value) => toggle("세탁기", value)}
      />
      <AddressInput
        zipCode={zipcode}
        address={address}
        detailAddress={detailAddress}
        setDetailAddress={(text) => setDetailAddress(text)}
        isModalVisible={isModalVisible}
        setIsModalVisible={() => setIsModalVisible(!isModalVisible)}
      />
      <DefaultBtn
        text="완료"
        onPress={() => {
          setUserField("industry", industry);
          setUserField("zipcode", zipcode);
          setUserField("address", address);
          setUserField("detailAddress", detailAddress);
          console.log("✅ 제출 데이터:", useSignupStore.getState().user);
          resetUser();
          resetIndustry();
          resetAddress();
          router.replace("/");
        }}
      />
    </Page>
  );
};

export default SignPage;
