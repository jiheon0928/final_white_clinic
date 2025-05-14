import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const mypage = () => {
  const handleLogout = () => {
    console.log("로그아웃 버튼 클릭");
    // TODO: 로그아웃 로직 구현
  };

  const handleEditProfile = () => {
    console.log("프로필 수정 버튼 클릭");
    // TODO: 프로필 수정 페이지로 이동
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Text style={styles.profileName}>홍길동</Text>
        <Text style={styles.profileEmail}>hong@example.com</Text>
      </View>

      <View style={styles.menuSection}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleEditProfile}
          activeOpacity={0.7}
        >
          <Text style={styles.menuText}>프로필 수정</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => console.log("알림 설정")}
          activeOpacity={0.7}
        >
          <Text style={styles.menuText}>알림 설정</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => console.log("이용약관")}
          activeOpacity={0.7}
        >
          <Text style={styles.menuText}>이용약관</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, styles.logoutButton]}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  profileEmail: {
    fontSize: 16,
    color: "#666",
  },
  menuSection: {
    marginTop: 20,
  },
  menuItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuText: {
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#ff6b6b",
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default mypage;
