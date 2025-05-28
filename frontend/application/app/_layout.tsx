import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";

const RootLayout = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="rider/(tabs)" />
        <Stack.Screen name="admin/(tabs)" />
        <Stack.Screen name="admin/riders/[id]" />
      </Stack>
      <Toast />
    </View>
  );
};

export default RootLayout;
