import { Text, StyleSheet, ScrollView } from "react-native";
import SearchInput from "@/components/common/SearchInput";
import Card from "@/components/common/Card";
import { router } from "expo-router";
import { riderDummy } from "@/dummyData/riderData";
import DetailBtn from "@/components/common/DetailBtn";
import Page from "@/components/common/Page";
const Riders = () => {
  return (
    // 헤더 작업 끝나면 해더 추가 해서 UI 맞추기
    <Page>
      <DetailBtn
        name="승인대기"
        onPress={() => router.push("/admin/riders/pending/page")}
        position="absolute"
        top={30}
        right={0}
      />
      <SearchInput placeholder="" onChangeText={() => {}} />
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
