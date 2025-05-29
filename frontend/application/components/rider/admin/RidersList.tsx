import { Text, ScrollView } from "react-native";
import SearchInput from "@/components/common/input/SearchInput";
import { router } from "expo-router";
import Page from "@/components/common/Page";
import BetweenHeader from "@/components/common/header/BetweenHeader";
import Card from "@/components/common/box/Card";
import useRiderStore from "@/stores/Rider.store";
import { RiderData } from "@/types/data/riderData";
import Title from "@/components/common/text/Title";
import { getRiders } from "@/utils/riderService";
import { useEffect, useState } from "react";

const RidersList = () => {
  const { searchRiderValue, setSearchRiderValue } = useRiderStore();
  const [riders, setRiders] = useState<RiderData[] | null>(null);

  useEffect(() => {
    const fetchRiders = async () => {
      const riders = await getRiders();
      setRiders(riders);
    };
    fetchRiders();
  }, []);

  if (!riders) {
    return <Text>기사 목록을 불러오는 중입니다.</Text>;
  }

  return (
    <Page>
      <BetweenHeader
        title="기사 현황"
        btnName="승인대기"
        onPress={() => router.push("/admin/riders/pending/page")}
      />
      <SearchInput
        placeholder="검색어를 입력하세요"
        onChangeText={(value: string) => setSearchRiderValue(value)}
      />
      <ScrollView>
        {riders
          .filter(
            (rider) =>
              rider.name.includes(searchRiderValue) ||
              rider.phone.includes(searchRiderValue)
          )
          .map((rider) => (
            <Card
              key={rider.id}
              btnName="상세정보"
              pressBtn={() =>
                router.push({
                  pathname: "/admin/riders/[id]",
                  params: { id: String(rider.id) },
                })
              }
            >
              <Title title={rider.name} />
              <Text>
                연락처 : <Text>{rider.phone}</Text>
              </Text>
              <Text>
                주소 : <Text>{rider.address}</Text>
              </Text>
            </Card>
          ))}
      </ScrollView>
    </Page>
  );
};

export default RidersList;
