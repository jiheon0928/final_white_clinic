import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (loginId: string, password: string) => {
  try {
    const response = await api.post("/auth/login", {
      loginId,
      password,
    });
    console.log(response.data);
    const { accessToken } = response.data;
    if (accessToken) {
      await AsyncStorage.setItem("accessToken", accessToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }

    return response.data;
  } catch (error) {
    console.error("로그인 실패:", error);
    throw error;
  }
};
