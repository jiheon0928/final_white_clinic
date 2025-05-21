import { useEffect, useRef, useState } from "react";
import {
  Animated,
  View,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import Input from "../common/Input";
import DefaultBtn from "../common/DefualtBtn";
import { router } from "expo-router";
import Page from "../common/Page";

const LoginPage = () => {
  const [isReady, setIsReady] = useState(false);
  const logoPosition = useRef(new Animated.Value(0)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();
      await new Promise((res) => setTimeout(res, 1500)); // 로딩 시뮬
      setIsReady(true);
      SplashScreen.hideAsync();
    };
    prepare();
  }, []);

  useEffect(() => {
    if (isReady) {
      Animated.sequence([
        Animated.timing(logoPosition, {
          toValue: -50,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(formOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isReady]);

  return (
    <Page>
      <View style={{ flex: 1, justifyContent: "center", gap: 10 }}>
        <Input title="아이디" />
        <Input title="비밀번호" />

        <View>
          <DefaultBtn
            onPress={() => router.push("/rider/(tabs)/waiting")}
            text="로그인"
          />
          <DefaultBtn onPress={() => router.push("/signup")} text="회원가입" />
          <DefaultBtn
            onPress={() => router.push("/admin/(tabs)/reservations")}
            text="관리자 페이지"
          />
        </View>
      </View>
    </Page>
  );
};

export default LoginPage;
