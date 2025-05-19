import { Stack } from "expo-router";
import React from "react";

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="rider/(tabs)" />
      <Stack.Screen name="admin/(tabs)" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="admin/reservations/[id]" />
    </Stack>
  );
};

export default RootLayout;
