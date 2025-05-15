import React from "react";
import { router, Stack } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/build/Ionicons";

const reservationDummy = [
  {
    id: 1,
    일: "에어컨 설치",
    제목: "신혼집 에어컨 벽걸이형 설치",
    등록시간: "2025-05-15T09:30:00",
    예약날짜: "2025-05-16",
    완료날짜: undefined,
    단가: 90000,
    고객이름: "홍길동",
    주소: "서울특별시 강남구 테헤란로 123",
    연락처: "010-1234-5678",
    고객요청: "작업 전 미리 전화 주세요",
    기사: "이현배",
    상태: "대기",
    분야: "에어컨",
  },
  {
    id: 2,
    일: "세탁기 설치",
    제목: "삼성 드럼 세탁기 21kg",
    등록시간: "2025-05-14T14:10:00",
    예약날짜: "2025-05-17",
    완료날짜: undefined,
    단가: 75000,
    고객이름: "이영희",
    주소: "인천광역시 남동구 논현동 456",
    연락처: "010-2345-6789",
    고객요청: "주차장 이용 가능 여부 알려주세요",
    기사: "이현배",
    상태: "진행",
    분야: "세탁기",
  },
  {
    id: 3,
    일: "에어컨 청소",
    제목: "코웨이 에어컨 청소",
    등록시간: "2025-05-13T11:45:00",
    예약날짜: "2025-05-18",
    완료날짜: "2025-05-20",
    단가: 60000,
    고객이름: "박철수",
    주소: "경기도 수원시 영통구 광교로 88",
    연락처: "010-3456-7890",
    고객요청: "현관 비밀번호 1234입니다",
    기사: "이현배",
    상태: "완료",
    분야: "에어컨",
  },
  {
    id: 4,
    일: "에어컨 청소",
    제목: "코웨이 에어컨 청소",
    등록시간: "2025-05-13T11:45:00",
    예약날짜: "2025-05-18",
    완료날짜: "2025-05-20",
    단가: 60000,
    고객이름: "박철수",
    주소: "경기도 수원시 영통구 광교로 88",
    연락처: "010-3456-7890",
    고객요청: "현관 비밀번호 1234입니다",
    기사: "이현배",
    상태: "완료",
    분야: "에어컨",
  },
  {
    id: 5,
    일: "에어컨 청소",
    제목: "코웨이 에어컨 청소",
    등록시간: "2025-05-13T11:45:00",
    예약날짜: "2025-05-18",
    완료날짜: "2025-05-20",
    단가: 60000,
    고객이름: "박철수",
    주소: "경기도 수원시 영통구 광교로 88",
    연락처: "010-3456-7890",
    고객요청: "현관 비밀번호 1234입니다",
    기사: "이현배",
    상태: "대기",
    분야: "에어컨",
  },
  {
    id: 6,
    일: "에어컨 청소",
    제목: "코웨이 에어컨 청소",
    등록시간: "2025-05-13T11:45:00",
    예약날짜: "2025-05-18",
    완료날짜: "2025-05-20",
    단가: 60000,
    고객이름: "박철수",
    주소: "경기도 수원시 영통구 광교로 88",
    연락처: "010-3456-7890",
    고객요청: "현관 비밀번호 1234입니다",
    기사: "이현배",
    상태: "완료",
    분야: "에어컨",
  },
  {
    id: 7,
    일: "에어컨 청소",
    제목: "코웨이 에어컨 청소",
    등록시간: "2025-05-13T11:45:00",
    예약날짜: "2025-05-18",
    완료날짜: "2025-05-20",
    단가: 60000,
    고객이름: "박철수",
    주소: "경기도 수원시 영통구 광교로 88",
    연락처: "010-3456-7890",
    고객요청: "현관 비밀번호 1234입니다",
    기사: "이현배",
    상태: "완료",
    분야: "에어컨",
  },
  {
    id: 8,
    일: "에어컨 청소",
    제목: "코웨이 에어컨 청소",
    등록시간: "2025-05-13T11:45:00",
    예약날짜: "2025-05-18",
    완료날짜: "2025-05-20",
    단가: 60000,
    고객이름: "박철수",
    주소: "경기도 수원시 영통구 광교로 88",
    연락처: "010-3456-7890",
    고객요청: "현관 비밀번호 1234입니다",
    기사: "이현배",
    상태: "완료",
    분야: "에어컨",
  },
  {
    id: 9,
    일: "에어컨 청소",
    제목: "코웨이 에어컨 청소",
    등록시간: "2025-05-13T11:45:00",
    예약날짜: "2025-05-18",
    완료날짜: "2025-05-20",
    단가: 60000,
    고객이름: "박철수",
    주소: "경기도 수원시 영통구 광교로 88",
    연락처: "010-3456-7890",
    고객요청: "현관 비밀번호 1234입니다",
    기사: "이현배",
    상태: "완료",
    분야: "에어컨",
  },
  {
    id: 10,
    일: "에어컨 청소",
    제목: "코웨이 에어컨 청소",
    등록시간: "2025-05-13T11:45:00",
    예약날짜: "2025-05-18",
    완료날짜: "2025-05-20",
    단가: 60000,
    고객이름: "박철수",
    주소: "경기도 수원시 영통구 광교로 88",
    연락처: "010-3456-7890",
    고객요청: "현관 비밀번호 1234입니다",
    기사: "이현배",
    상태: "완료",
    분야: "에어컨",
  },
  {
    id: 11,
    일: "에어컨 청소",
    제목: "코웨이 에어컨 청소",
    등록시간: "2025-05-13T11:45:00",
    예약날짜: "2025-05-18",
    완료날짜: "2025-05-20",
    단가: 60000,
    고객이름: "박철수",
    주소: "경기도 수원시 영통구 광교로 88",
    연락처: "010-3456-7890",
    고객요청: "현관 비밀번호 1234입니다",
    기사: "이현배",
    상태: "완료",
    분야: "에어컨",
  },
  {
    id: 12,
    일: "에어컨 청소",
    제목: "코웨이 에어컨 청소",
    등록시간: "2025-05-13T11:45:00",
    예약날짜: "2025-05-18",
    완료날짜: "2025-05-20",
    단가: 60000,
    고객이름: "박철수",
    주소: "경기도 수원시 영통구 광교로 88",
    연락처: "010-3456-7890",
    고객요청: "현관 비밀번호 1234입니다",
    기사: "이현배",
    상태: "완료",
    분야: "에어컨",
  },
];

const status = [
  { id: 1, status: "대기" },
  { id: 2, status: "진행" },
  { id: 3, status: "완료" },
];
const Reservations = () => {
  return (
    <>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 20,
          backgroundColor: "#ffffff",
        }}
      >
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
        <View style={styles.input}>
          <Ionicons name="search-outline" size={20} color="#222"></Ionicons>
          <TextInput placeholder="검색어를 입력해주세요" />
        </View>

        <ScrollView>
          {reservationDummy.map((reservation) => (
            <View key={reservation.id} style={styles.reservationCard}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {reservation.제목}
                </Text>
                <Pressable
                  onPress={() =>
                    router.push(`/admin/reservations/${reservation.id}`)
                  }
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

              <Text>주소 : {reservation.주소}</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>가격 : {reservation.단가}</Text>
                <View
                  style={[
                    styles.statusCircle,
                    { backgroundColor: getStatusColor(reservation.상태) },
                  ]}
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
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
  input: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 10,
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
