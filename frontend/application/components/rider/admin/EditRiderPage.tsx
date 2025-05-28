import CalenderInput from "@/components/common/input/CalenderInput";
import Page from "@/components/common/Page";
import Input from "@/components/common/input/Input";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, ScrollView, View } from "react-native";
import DefaultBtn from "@/components/common/button/DefualtBtn";
import BackBtnHeader from "@/components/common/header/BackBtnHeader";
import AddressInput from "@/components/common/input/AddressInput";
import useAddressStore from "@/stores/address.store";
import CheckBoxBundle from "@/components/common/input/CheckBoxBundle";
import useIndustryStore from "@/stores/industry.store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ToggleInput from "@/components/common/input/ToggleInput";
import useDateStore from "@/stores/date.store";
import useRiderStore from "@/stores/Rider.store";
import { IndustryType } from "@/types/stores/zustandStore.types";

const EditRiderPage = ({ id }: { id: string }) => {
  const { rider, setRiderField, resetRider, setRider } = useRiderStore();
  const { date, resetDate } = useDateStore();
  const { address, detailAddress, zipcode, setAddress, resetAddress } =
    useAddressStore();
  const { industry, resetIndustry, setSelected } = useIndustryStore();
  const insets = useSafeAreaInsets();
  const [selectedBenefit, setSelectedBenefit] = useState(0.4);

  const handleSubmit = () => {
    setRiderField("address", address);
    setRiderField("zipcode", zipcode);
    setRiderField("detailAddress", detailAddress);
    setRiderField("industry", industry);
    setRiderField("birth", date);
    setRiderField("benefit", selectedBenefit);
    console.log("✅ 제출 데이터:", useRiderStore.getState().rider);
    resetRider();
    resetDate();
    resetAddress();
    resetIndustry();
    router.back();
  };
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
    setAddress("zipcode", userData.zipcode);
    setAddress("address", userData.address);
    setAddress("detailAddress", userData.detailAddress);
  }, []);

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
          <CalenderInput title="생년월일" />
          <AddressInput />
          <CheckBoxBundle />
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
          <DefaultBtn text="완료" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </Page>
  );
};

export default EditRiderPage;
