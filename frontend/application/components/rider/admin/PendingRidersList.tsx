import { View, ScrollView, Platform } from "react-native";
import Page from "@/components/common/Page";
import Info from "@/components/common/text/Info";
import Card from "@/components/common/box/Card";
import BackBtnHeader from "@/components/common/header/BackBtnHeader";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getPendingRider } from "@/hooks/dataHandler";
import { useEffect, useState } from "react";
import { approveRider, getRiderByApproval } from "@/utils/riderService";
import { RiderData } from "@/types/data/riderData";
import { router } from "expo-router";
const PendingRidersList = () => {
  const insets = useSafeAreaInsets();
  const [pendingRiders, setPendingRiders] = useState<RiderData[]>([]);
  useEffect(() => {
    const fetchPendingRiders = async () => {
      const riders = await getRiderByApproval(false);
      setPendingRiders(riders);
    };
    fetchPendingRiders();
  }, [pendingRiders]);

  return (
    <Page>
      <BackBtnHeader title="승인 대기" />
      <ScrollView style={{ backgroundColor: "#fff" }}>
        <View
          style={{
            paddingBottom:
              insets.bottom + 20 || (Platform.OS === "android" ? 20 : 0),
            gap: 10,
          }}
        >
          {pendingRiders.map((rider, i) => (
            <Card
              key={i}
              btnName="승인하기"
              pressBtn={() => {
                approveRider(rider.id);
                router.back();
              }}
            >
              {getPendingRider(rider).map((info) => (
                <Info
                  key={info.category}
                  category={info.category}
                  value={info.value}
                />
              ))}
            </Card>
          ))}
        </View>
      </ScrollView>
    </Page>
  );
};

export default PendingRidersList;
