import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>로그인 페이지</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>아이디</Text>
        <TextInput
          style={styles.input}
          placeholder="아이디를 입력해 주세요."
          value={id}
          onChangeText={setId}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>비밀번호</Text>
        <View style={styles.pwRow}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="비밀번호를 입력해 주세요."
            value={pw}
            onChangeText={setPw}
            secureTextEntry={!showPw}
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => setShowPw((v) => !v)}
            style={styles.eyeBtn}
          >
            <Ionicons
              name={showPw ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#222"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => router.push("/rider/waiting")}
      >
        <Text style={styles.loginBtnText}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signupBtn}
        onPress={() => router.push("/signup")}
      >
        <Text style={styles.signupBtnText}>회원가입</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signupBtn}
        onPress={() => router.push("/admin/(tabs)/reservations")}
      >
        <Text style={styles.signupBtnText}>관리자 로그인</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 32,
    marginTop: 16,
  },
  inputGroup: {
    width: "100%",
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    marginBottom: 6,
    color: "#222",
  },
  input: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 15,
    backgroundColor: "#fff",
  },
  pwRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  eyeBtn: {
    position: "absolute",
    right: 12,
    padding: 4,
  },
  loginBtn: {
    backgroundColor: "#6DD6FF",
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  loginBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupBtn: {
    backgroundColor: "#6DD6FF",
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  signupBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Index;
