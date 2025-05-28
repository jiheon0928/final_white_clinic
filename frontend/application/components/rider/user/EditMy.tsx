import CalenderInput from "@/components/common/input/CalenderInput";
import Page from "@/components/common/Page";
import Input from "@/components/common/input/Input";
import { router } from "expo-router";
import React from "react";
import { Platform, ScrollView, View } from "react-native";
import DefaultBtn from "@/components/common/button/DefualtBtn";
import BackBtnHeader from "@/components/common/header/BackBtnHeader";
import useEditRiderStore from "@/stores/Rider.store";
import AddressInput from "@/components/common/input/AddressInput";
import useAddressStore from "@/stores/address.store";
import CheckBoxBundle from "@/components/common/input/CheckBoxBundle";
import useIndustryStore from "@/stores/industry.store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useDateStore from "@/stores/date.store";

const EditMyPage = ({ id }: { id: string }) => {
  const { rider, setRiderField, resetRider } = useEditRiderStore();
  const { date, resetDate } = useDateStore();
  const { zipcode, address, detailAddress, setAddress, resetAddress } =
    useAddressStore();
  const { industry, resetIndustry } = useIndustryStore();
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
    setRiderField("birth", date);

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
          <CalenderInput title="생년월일" />

          <AddressInput />

          <CheckBoxBundle />

          <DefaultBtn text="완료" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </Page>
  );
};

export default EditMyPage;
