import { Text, StyleSheet, ScrollView } from "react-native";
import SearchInput from "@/components/common/SearchInput";
import Card from "@/components/common/Card";
import { router } from "expo-router";
import { riderDummy } from "@/dummyData/riderData";
import Page from "@/components/common/Page";
import BetweenHeader from "@/components/common/header/BetweenHeader";

const Riders = () => {
  return (
    <Page>
      <BetweenHeader
        title="기사 현황"
        btnName="승인대기"
        onPress={() => router.push("/admin/riders/pending/page")}
      />
      <SearchInput placeholder="검색하세요" onChangeText={() => {}} />
      <ScrollView>
        {riderDummy.map((rider) => (
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
            <Text>{rider.name}</Text>
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

const styles = StyleSheet.create({});

export default Riders;
