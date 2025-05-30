import CalenderInput from "@/components/common/input/CalenderInput";
import Page from "@/components/common/Page";
import Input from "@/components/common/input/Input";
import { router } from "expo-router";
import React, { useEffect } from "react";
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
import { getRiderById, updateRider } from "@/utils/riderService";
import { Industry } from "@/types/data/reservationData";

const EditRiderPage = ({ id }: { id: string }) => {
  const { rider, setRiderField, resetRider, setRider, benefitType } =
    useRiderStore();
  const { date, resetDate, setDate } = useDateStore();
  const { address, detailAddress, zipcode, setAddress, resetAddress } =
    useAddressStore();
  const { industry, resetIndustry, setSelectedIndustry, setIndustry } =
    useIndustryStore();
  const insets = useSafeAreaInsets();

  const editRiderInputFields = [
    { title: "이름", key: "name" },
    { title: "전화번호", key: "phone" },
    { title: "이메일", key: "email" },
  ] as const;

  useEffect(() => {
    const fetchData = async () => {
      const rider = await getRiderById(Number(id));

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
    await updateRider(Number(id), useRiderStore.getState().rider);
    resetRider();
    resetDate();
    resetAddress();
    resetIndustry();
    router.replace(`/admin/riders/${id}`);
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
          <ToggleInput
            title="수당률"
            boxStyle={{ width: 100 }}
            options={benefitType}
            selected={benefitType[rider.benefit - 1]}
            setSelected={(option) => setRiderField("benefit", Number(option))}
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
