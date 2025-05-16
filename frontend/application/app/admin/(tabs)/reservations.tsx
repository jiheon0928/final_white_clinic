import React from "react";
import { router, Stack } from "expo-router";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { reservationDummy, status } from "@/dummyData/reservationData";
import Page from "@/components/common/Page";
import SearchInput from "@/components/common/SearchInput";

const Reservations = () => {
  return (
    <Page>
      <Text style={{ fontSize: 25, fontWeight: "bold", marginBottom: 20 }}>
        예약 현황
      </Text>
      <View style={styles.statusBar}>
        {status.map((status) => (
          <Pressable style={styles.statusButton}>
            <Text>{status.status}</Text>
            <View
              style={[
                styles.statusCircle,
                { backgroundColor: getStatusColor(status.status) },
              ]}
            />
          </Pressable>
        ))}
      </View>
      <SearchInput placeholder="검색어를 입력해주세요" />

      <FlatList
        data={reservationDummy}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.reservationCard}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {item.제목}
              </Text>
              <Pressable
                onPress={() => router.push(`/admin/reservations/${item.id}`)}
                style={{
                  padding: 5,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 8,
                }}
              >
                <Text>상세 정보</Text>
              </Pressable>
            </View>

            <Text>주소 : {item.주소}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>가격 : {item.단가}</Text>
              <View
                style={[
                  styles.statusCircle,
                  { backgroundColor: getStatusColor(item.상태) },
                ]}
              />
            </View>
          </View>
        )}
      />
    </Page>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
  },
  statusButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
    marginHorizontal: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },

  reservationCard: {
    gap: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
  },

  statusCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
const getStatusColor = (status: string) => {
  if (status === "대기") {
    return "#4299e1";
  } else if (status === "진행") {
    return "#48bb78";
  } else if (status === "완료") {
    return "#a0aec0";
  }
};
export default Reservations;
