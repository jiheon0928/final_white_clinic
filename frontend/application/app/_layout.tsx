import { Stack } from "expo-router";
import React from "react";
import Toast from "react-native-toast-message";

const RootLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="rider/(tabs)" />
        <Stack.Screen name="admin/(tabs)" />
      </Stack>
      <Toast />
    </>
  );
};

export default RootLayout;
