import { AuthProvider, useAuth } from "../context/authContext";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#4285F4",
    secondary: "yellow",
  },
};

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});



function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading) return null;

  return (
    <PaperProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!!isAuthenticated}>
          <Stack.Screen name="(protected)" />
        </Stack.Protected>
        <Stack.Screen name="(auth)"  />
        <Stack.Screen name="index" />
      </Stack>
    </PaperProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
