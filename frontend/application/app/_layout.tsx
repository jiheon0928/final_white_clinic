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
        <Stack.Screen name="rider/reservation/[id]" />
        <Stack.Screen name="rider/reservation/[id]/edit" />
        <Stack.Screen name="admin/reservation/[id]" />
        <Stack.Screen name="admin/reservation/[id]/edit" />
        <Stack.Screen name="admin/reservation/[id]/detail" />
        <Stack.Screen name="admin/reservation/[id]/detail/edit" />
      </Stack>
      <Toast />
    </View>
  );
};

export default RootLayout;
