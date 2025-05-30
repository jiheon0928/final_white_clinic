import CalenderInput from "@/components/common/input/CalenderInput";
import Page from "@/components/common/Page";
import Input from "@/components/common/input/Input";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Platform, ScrollView, View } from "react-native";
import DefaultBtn from "@/components/common/button/DefualtBtn";
import BackBtnHeader from "@/components/common/header/BackBtnHeader";
import useRiderStore from "@/stores/Rider.store";
import AddressInput from "@/components/common/input/AddressInput";
import useAddressStore from "@/stores/address.store";
import CheckBoxBundle from "@/components/common/input/CheckBoxBundle";
import useIndustryStore from "@/stores/industry.store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useDateStore from "@/stores/date.store";
import { getRiderById, updateRider } from "@/utils/riderService";
import { Industry } from "@/types/data/reservationData";
import { useAuthStore } from "@/stores/auth.store";

const EditMyPage = () => {
  const { rider, setRiderField, resetRider, setRider } = useRiderStore();
  const { date, resetDate, setDate } = useDateStore();
  const { address, detailAddress, zipcode, setAddress, resetAddress } =
    useAddressStore();
  const { industry, resetIndustry, setSelectedIndustry, setIndustry } =
    useIndustryStore();
  const insets = useSafeAreaInsets();
  const { user } = useAuthStore();

  const editRiderInputFields = [
    { title: "이름", key: "name" },
    { title: "전화번호", key: "phone" },
    { title: "이메일", key: "email" },
  ] as const;

  useEffect(() => {
    const fetchData = async () => {
      const rider = await getRiderById(user.id);

      setRider({
        name: String(rider.name),
        phone: String(rider.phone),
        email: String(rider.email),
        address: String(rider.address),
        zipcode: String(rider.zipcode),
        birth: rider.birth,
        detailAddress: String(rider.detailAddress),
        significant: String(rider.significant),
        industry: rider.industry.map((item: Industry) => item.industry),
        benefit: rider.benefit.id,
      });
      const industryList = rider.industry.map(
        (item: Industry) => item.industry
      );
      setIndustry(industryList);
      setDate(new Date(rider.birth));
      setSelectedIndustry(industryList[0]);
      setAddress("zipcode", rider.zipcode);
      setAddress("address", rider.address);
      setAddress("detailAddress", rider.detailAddress);
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    const industryIdMap = {
      에어컨: 1,
      세탁기: 2,
      건조기: 3,
    };
    setRiderField("address", address);
    setRiderField("zipcode", zipcode);
    setRiderField("detailAddress", detailAddress);
    setRiderField(
      "industry",
      industry.map((name) => industryIdMap[name])
    );
    setRiderField("birth", date);
    setRiderField("benefit", rider.benefit);
    await updateRider(user.id, useRiderStore.getState().rider);
    resetRider();
    resetDate();
    resetAddress();
    resetIndustry();
    router.replace(`/rider/myPage`);
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

          <DefaultBtn text="완료" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </Page>
  );
};

export default EditMyPage;
