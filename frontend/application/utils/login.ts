import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "@/stores/auth.store";
import { router } from "expo-router";

export const login = async (loginId: string, password: string) => {
  try {
    const response = await api.post("/auth/login", {
      loginId,
      password,
    });

    const { accessToken, user } = response.data;
    const { name, id } = user;

    if (accessToken) {
      await AsyncStorage.setItem("accessToken", accessToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      useAuthStore.getState().setAuth(name, accessToken, id);
    }
    return response.data;
  } catch (error) {
    console.error("로그인 실패:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post("/auth/logout");
    AsyncStorage.removeItem("accessToken");
    useAuthStore.getState().setAuthOff();
    router.replace("/");
  } catch (error) {
    console.error("로그아웃 실패:", error);
    throw error;
  }
};
