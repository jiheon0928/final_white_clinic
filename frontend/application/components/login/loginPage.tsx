import { router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Image, StyleSheet, View } from "react-native";
import Page from "../common/Page";
import DefaultBtn from "../common/button/DefualtBtn";
import Input from "../common/input/Input";

const { height } = Dimensions.get("window");
const LOGO_SIZE = 170;
const initialLogoY = height / 2 - LOGO_SIZE / 2;

const LoginPage = () => {
  const [isReady, setIsReady] = useState(false);
  const logoPosition = useRef(new Animated.Value(initialLogoY)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();
      await new Promise((res) => setTimeout(res, 1500));
      setIsReady(true);
      SplashScreen.hideAsync();
    };
    prepare();
  }, []);

  useEffect(() => {
    if (isReady)
      Animated.sequence([
        Animated.delay(1500),
        Animated.stagger(600, [
          Animated.timing(logoPosition, {
            toValue: initialLogoY - 250,
            duration: 800,
            useNativeDriver: false,
          }),
          Animated.timing(formOpacity, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
  }, [isReady]);

  return (
    <Page>
      <View style={{ flex: 1, justifyContent: "center", gap: 10 }}>
        <Animated.View style={[styles.logoContainer, { top: logoPosition }]}>
          <Image
            source={require("../../assets/logo.jpg")}
            style={styles.logoPlaceholder}
            resizeMode="cover"
          />
        </Animated.View>

        <Animated.View style={[{ opacity: formOpacity }]}>
          <Input title="아이디" />
          <Input title="비밀번호" />
          <View>
            <DefaultBtn
              onPress={() => router.push("/rider/(tabs)/waiting")}
              text="로그인"
            />
            <DefaultBtn
              onPress={() => router.push("/signup")}
              text="회원가입"
            />
            <DefaultBtn
              onPress={() => router.push("/admin/(tabs)/reservations")}
              text="관리자 페이지"
            />
          </View>
        </Animated.View>
      </View>
    </Page>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    position: "absolute",
    alignSelf: "center",
    objectFit: "cover",
    width: LOGO_SIZE,
    height: LOGO_SIZE,
  },
  logoPlaceholder: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    backgroundColor: "#ddd",
    borderRadius: 3,
  },
});

export default LoginPage;
