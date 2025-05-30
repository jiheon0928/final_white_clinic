import { router } from "expo-router";
import { View, Text } from "react-native";
import Page from "@/components/common/Page";
import BackBtnHeader from "@/components/common/header/BackBtnHeader";
import Info from "@/components/common/text/Info";
import DefaultBtn from "@/components/common/button/DefualtBtn";
import { getPendingRider } from "@/hooks/dataHandler";
import { RiderDetailPageStyles } from "@/styles/rider/riderDetailPage";
import { RiderData } from "@/types/data/riderData";
import { useEffect, useState } from "react";
import { getRiderById } from "@/utils/riderService";

const RiderDetail = ({ id }: { id: string }) => {
  const [rider, setRider] = useState<RiderData | null>(null);
  useEffect(() => {
    const fetchRider = async () => {
      const rider = await getRiderById(Number(id));
      setRider(rider);
    };
    fetchRider();
  }, []);
  if (!rider) {
    return (
      <Page>
        <BackBtnHeader title="기사 상세 정보" />
        <Text>기사 정보를 찾을 수 없습니다.</Text>
      </Page>
    );
  }

  return (
    <Page>
      <BackBtnHeader title="기사 상세 정보" />
      <View style={RiderDetailPageStyles.card}>
        {getPendingRider(rider).map((info) => (
          <Info
            key={info.category}
            category={info.category}
            value={info.value}
          />
        ))}

        <Info value={"가능 품목 리스트 : "} />
        <View style={RiderDetailPageStyles.industryList}>
          {rider.industry?.map((item, index) => (
            <Text key={index}>
              {index + 1}. {item.industry}
            </Text>
          ))}
        </View>

        <Info value={"특이사항"} />
        <View style={RiderDetailPageStyles.requestBox}>
          <Text>{rider.significant}</Text>
        </View>

        <DefaultBtn
          text="수정"
          onPress={() => {
            router.push(`/admin/riders/edit/${id}`);
          }}
        />
      </View>
    </Page>
  );
};

export default RiderDetail;
