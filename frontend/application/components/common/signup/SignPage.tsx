import useAddressStore from "@/stores/address.store";
import useBirthStore from "@/stores/calender.store";
import useIndustryStore from "@/stores/industry.store";
import useSignupStore from "@/stores/signup.store";
import { router } from "expo-router";
import React from "react";
import { Platform, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DefaultBtn from "../button/DefualtBtn";
import BackBtnHeader from "../header/BackBtnHeader";
import AddressInput from "../input/AddressInput";
import CalenderInput from "../input/CalenderInput";

import useDateStore from "@/stores/calender.store";
import { updateDateWithoutTime } from "@/app/hooks/input";

import CheckBoxBundle from "../input/CheckBoxBundle";
import Input from "../input/Input";
import Page from "../Page";

const SignPage = () => {
  const { user, setUserField, resetUser } = useSignupStore();
  const { industry, toggle, resetIndustry } = useIndustryStore();
  const { date, setDate, resetDate } = useDateStore();
  const { zipcode, address, detailAddress, setDetailAddress, resetAddress } =
    useAddressStore();

  const insets = useSafeAreaInsets();

  const handleSubmit = () => {
    setUserField("industry", industry);
    setUserField("zipcode", zipcode);
    setUserField("address", address);
    setUserField("detailAddress", detailAddress);
    setUserField("birth", date);
    console.log("✅ 제출 데이터:", useSignupStore.getState().user);
    resetUser();
    resetIndustry();
    resetAddress();
    resetDate();
    router.replace("/");
  };

  const signupInputFields = [
    { title: "아이디", key: "loginId" },
    { title: "비밀번호", key: "password" },
    { title: "이름", key: "name" },
    { title: "전화번호", key: "phone" },
    { title: "이메일", key: "email" },
  ] as const;

  return (
    <Page>
      <BackBtnHeader title="회원가입" />
      <ScrollView>
        <View
          style={{
            paddingBottom:
              insets.bottom + 20 || (Platform.OS === "android" ? 20 : 0),
            gap: 10,
          }}
        >
          {signupInputFields.map(({ title, key }) => (
            <Input
              key={key}
              title={title}
              value={user[key]}
              onChangeText={(text) => setUserField(key, text)}
            />
          ))}
          <CalenderInput
            title="생년월일"
            date={new Date(date)}
            onChangeDate={(selected) => updateDateWithoutTime(selected)}
          />
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
          />
          <DefaultBtn text="완료" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </Page>
  );
};

export default SignPage;
