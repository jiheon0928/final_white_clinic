// import { View, ScrollView, Platform } from "react-native";
// import Page from "@/components/common/Page";
// import Info from "@/components/common/text/Info";
// import Card from "@/components/common/box/Card";
// import BackBtnHeader from "@/components/common/header/BackBtnHeader";
// import { ridersData } from "@/dummyData/ridersData";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { getPendingRider } from "@/hooks/dataHandler";
// const PendingRidersList = () => {
//   const insets = useSafeAreaInsets();
//   const pendingRiders = ridersData.filter((rider) => !rider.approval);

//   return (
//     <Page>
//       <BackBtnHeader title="승인 대기" />
//       <ScrollView style={{ backgroundColor: "#fff" }}>
//         <View
//           style={{
//             paddingBottom:
//               insets.bottom + 20 || (Platform.OS === "android" ? 20 : 0),
//             gap: 10,
//           }}
//         >
//           {pendingRiders.map((rider, i) => (
//             <Card key={i} btnName="승인하기" pressBtn={() => {}}>
//               {getPendingRider(rider).map((info) => (
//                 <Info
//                   key={info.category}
//                   category={info.category}
//                   value={info.value}
//                 />
//               ))}
//             </Card>
//           ))}
//         </View>
//       </ScrollView>
//     </Page>
//   );
// };

// export default PendingRidersList;
