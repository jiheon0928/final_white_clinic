import CalenderInput from "@/components/common/input/CalenderInput";
import Page from "@/components/common/Page";
import Input from "@/components/common/input/Input";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, ScrollView, View } from "react-native";
import DefaultBtn from "@/components/common/button/DefualtBtn";
import BackBtnHeader from "@/components/common/header/BackBtnHeader";
import useBirthStore from "@/stores/calender.store";
import useEditRiderStore from "@/stores/editRider.store";
import AddressInput from "@/components/common/input/AddressInput";
import useAddressStore from "@/stores/address.store";
import CheckBoxBundle from "@/components/common/input/CheckBoxBundle";
import useIndustryStore, { IndustryType } from "@/stores/industry.store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useDateStore from "@/stores/calender.store";
import { updateDateWithoutTime } from "@/app/hooks/input";

const EditMyPage = () => {
  const { rider, setRiderField, resetRider, setRider } = useEditRiderStore();
  const { date, resetDate } = useDateStore();
  const {
    zipcode,
    address,
    detailAddress,
    setDetailAddress,
    setAddress,
    resetAddress,
  } = useAddressStore();
  const { industry, toggle, resetIndustry, setSelected } = useIndustryStore();
  const insets = useSafeAreaInsets();

  const editRiderInputFields = [
    { title: "이름", key: "name" },
    { title: "전화번호", key: "phone" },
    { title: "이메일", key: "email" },
  ] as const;

  const handleSubmit = () => {
    setRiderField("address", address);
    setRiderField("zipcode", zipcode);
    setRiderField("detailAddress", detailAddress);
    setRiderField("industry", industry);
    setRiderField("birth", date.toISOString().split("T")[0]);

    console.log("✅ 제출 데이터:", useEditRiderStore.getState().rider);

    resetRider();
    resetDate();
    resetAddress();
    resetIndustry();
    router.back();
  };

  return (
    <Page>
      <BackBtnHeader title="기사 정보 수정" />
      <ScrollView>
        <View
          style={{
            paddingBottom:
              insets.bottom + 20 || (Platform.OS === "android" ? 20 : 0),
            gap: 10,
          }}
        >
          {editRiderInputFields.map(({ title, key }) => (
            <Input
              key={key}
              title={title}
              value={rider[key]}
              onChangeText={(text) => setRiderField(key, text)}
            />
          ))}
          <CalenderInput
            date={date}
            onChangeDate={(selected) => updateDateWithoutTime(selected)}
          />

          <AddressInput
            zipCode={zipcode}
            address={address}
            detailAddress={detailAddress}
            setDetailAddress={(text) => setDetailAddress(text)}
          />

          <CheckBoxBundle
            ACvalue={industry.includes("에어컨")}
            WSvalue={industry.includes("세탁기")}
            onValueChangAC={(value) => toggle("에어컨", value)}
            onValueChangeWS={(value) => toggle("세탁기", value)}
          />

          <DefaultBtn text="완료" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </Page>
  );
};

export default EditMyPage;
