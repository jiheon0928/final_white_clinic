import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Page from "@/components/common/Page";
import BetweenHeader from "@/components/common/header/BetweenHeader";
// props 타입 정의
interface MyPageProps {
  name: string;
  phone: string;
  email: string;
  rate: string;
}

const periodOptions = ["일일 매출", "주간 매출", "월간 매출"];

const MyPage = ({ name, phone, email, rate }: MyPageProps) => {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState(periodOptions[0]);
  const [showPeriod, setShowPeriod] = useState(false);

  const handleLogout = () => {
    router.replace("/");
  };

  return (
    <Page>
      <View style={styles.container}>
        <BetweenHeader
          title="마이페이지"
          btnName="로그아웃"
          onPress={handleLogout}
        />
        <View style={styles.profileCard}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.profileName}>{name}</Text>
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => router.push("/rider/mypage/[id]")}
            >
              <Text style={styles.editBtnText}>정보 수정</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.profileText}>전화번호 : {phone}</Text>
          <Text style={styles.profileText}>이메일: {email}</Text>
          <Text style={styles.profileText}>수당률 : {rate}</Text>
        </View>

        <View style={styles.chartSection}>
          <View style={{ alignItems: "flex-end", marginBottom: 8 }}>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowPeriod(!showPeriod)}
            >
              <Text style={styles.dropdownText}>{selectedPeriod}</Text>
              <Ionicons
                name={showPeriod ? "chevron-up" : "chevron-down"}
                size={16}
                color="#222"
                style={{ marginLeft: 4 }}
              />
            </TouchableOpacity>
            {showPeriod && (
              <View style={styles.dropdownList}>
                {periodOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedPeriod(option);
                      setShowPeriod(false);
                    }}
                  >
                    <Text style={styles.dropdownText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          <View style={styles.chartBox}>
            <Text style={styles.chartPlaceholder}>매출 차트</Text>
          </View>
        </View>
      </View>
    </Page>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 16,
    marginTop: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    position: "relative",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  logoutBtn: {
    position: "absolute",
    right: 16,
    backgroundColor: "#d60000",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  logoutBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  profileCard: {
    borderWidth: 1,
    borderColor: "#222",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  editBtn: {
    backgroundColor: "#eee",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  editBtnText: {
    fontSize: 13,
    color: "#222",
  },
  profileText: {
    fontSize: 16,
    marginBottom: 2,
  },
  chartSection: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#fff",
    minWidth: 90,
  },
  dropdownText: {
    fontSize: 14,
    color: "#222",
  },
  dropdownList: {
    position: "absolute",
    top: 32,
    right: 0,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 6,
    zIndex: 10,
    width: 94,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dropdownItem: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  chartBox: {
    backgroundColor: "#ddd",
    height: 180,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  chartPlaceholder: {
    fontSize: 20,
    color: "#222",
    fontWeight: "bold",
  },
});

export default MyPage;
