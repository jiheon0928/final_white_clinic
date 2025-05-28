import { Text, StyleSheet, ScrollView } from "react-native";
import SearchInput from "@/components/common/input/SearchInput";
import { router } from "expo-router";
import { riderDummy } from "@/dummyData/riderData";
import Page from "@/components/common/Page";
import BetweenHeader from "@/components/common/header/BetweenHeader";
import Card from "@/components/common/box/Card";
import Info from "@/components/common/text/Info";

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
            <Info value={rider.name} category="이름" />
            <Info value={rider.phone} category="연락처" />
            <Info value={rider.address} category="주소" />
          </Card>
        ))}
      </ScrollView>
    </Page>
  );
};

const styles = StyleSheet.create({});

export default Riders;
