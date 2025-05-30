import { router } from "expo-router";
import { Animated, Image, View } from "react-native";
import Page from "../common/Page";
import DefaultBtn from "../common/button/DefualtBtn";
import Input from "../common/input/Input";
import { useSplashReady } from "@/hooks/login/useSplashReady";
import { useLoginAnimation } from "@/hooks/login/animation";
import { loginStyles } from "@/styles/loginStyle";
import { login } from "@/utils/login";
import { useState } from "react";
const LoginPage = () => {
  const isReady = useSplashReady();
  const { logoPosition, formOpacity } = useLoginAnimation(isReady);
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await login(loginId, password);
    console.log(response);
    router.push("/rider/(tabs)/waiting");
  };
  return (
    <Page>
      <View style={{ flex: 1, justifyContent: "center", gap: 10 }}>
        <Animated.View
          style={[loginStyles.logoContainer, { top: logoPosition }]}
        >
          <Image
            source={require("../../assets/logo.jpg")}
            style={loginStyles.logoPlaceholder}
            resizeMode="cover"
          />
        </Animated.View>
        <Animated.View style={[{ opacity: formOpacity }]}>
          <Input title="아이디" value={loginId} onChangeText={setLoginId} />
          <Input title="비밀번호" value={password} onChangeText={setPassword} />
          <View>
            <DefaultBtn onPress={handleLogin} text="로그인" />
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

export default LoginPage;
