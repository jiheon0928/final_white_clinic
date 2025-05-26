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
import ToggleInput from "@/components/common/input/ToggleInput";

const EditRiderPage = () => {
  const { rider, setRiderField, resetRider, setRider } = useEditRiderStore();
  const { birth, setBirth, resetBirth } = useBirthStore();
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
  const [selectedBenefit, setSelectedBenefit] = useState(0.4);

  const editRiderInputFields = [
    { title: "이름", key: "name" },
    { title: "전화번호", key: "phone" },
    { title: "이메일", key: "email" },
  ] as const;

  const benefit = [0.4, 0.5, 0.6];
  const userData = {
    name: "김민규",
    phone: "010-0101-0101",
    email: "asd@asd.com",
    address: "서울특별시 강남구 테헤란로 14길 6 남도빌딩 2층",
    zipcode: "06236",
    birth: "1990-01-01",
    detailAddress: "201호",
    significant: "메모",
    industry: ["에어컨", "세탁기"],
  };

  useEffect(() => {
    setRider({
      name: String(userData.name),
      phone: String(userData.phone),
      email: String(userData.email),
      address: String(userData.address),
      zipcode: String(userData.zipcode),
      birth: String(userData.birth),
      detailAddress: String(userData.detailAddress),
      significant: String(userData.significant),
      industry: Array.isArray(userData.industry)
        ? (userData.industry as IndustryType[])
        : [String(userData.industry) as IndustryType],
    });
    setSelected(userData.industry as IndustryType[]);
    setAddress(userData.zipcode, userData.address);
    setDetailAddress(userData.detailAddress);
  }, []);

  return (
    <Page>
      <ScrollView>
        <View
          style={{
            paddingBottom:
              insets.bottom + 20 || (Platform.OS === "android" ? 20 : 0),
            gap: 10,
          }}
        >
          <BackBtnHeader title="기사 정보 수정" />
          {editRiderInputFields.map(({ title, key }) => (
            <Input
              key={key}
              title={title}
              value={rider[key]}
              onChangeText={(text) => setRiderField(key, text)}
            />
          ))}
          <CalenderInput
            date={birth ? new Date(birth) : new Date()}
            onChangeDate={(selected) => setBirth(selected)}
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
          <ToggleInput
            title="수당률"
            boxStyle={{ width: 100 }}
            options={benefit}
            selected={selectedBenefit}
            setSelected={(option) => setSelectedBenefit(Number(option))}
          />

          <Input
            title="관리자 메모"
            value={rider.significant}
            onChangeText={(text) => setRiderField("significant", text)}
            numberOfLines={3}
          />
          <DefaultBtn
            text="완료"
            onPress={() => {
              setRiderField("address", address);
              setRiderField("zipcode", zipcode);
              setRiderField("detailAddress", detailAddress);
              setRiderField("industry", industry);
              setRiderField("birth", birth.toISOString().split("T")[0]);
              setRiderField("benefit", selectedBenefit);
              console.log(
                "✅ 제출 데이터:",
                useEditRiderStore.getState().rider
              );
              resetRider();
              resetBirth();
              resetAddress();
              resetIndustry();
              router.back();
            }}
          />
        </View>
      </ScrollView>
    </Page>
  );
};

export default EditRiderPage;
