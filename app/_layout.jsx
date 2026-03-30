import { Stack, useRootNavigationState } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { AuthProvider, useAuth } from "../context/authContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3b5bdb",
    secondary: "yellow",
  },
};

SplashScreen.setOptions({
  duration: 1500,
  fade: true,
});

function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigationState = useRootNavigationState();
  useEffect(() => {
    if (!navigationState?.key || isLoading) return;
    SplashScreen.hideAsync();
  }, [navigationState?.key, isLoading, isAuthenticated]);

  return (
    <PaperProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Protected guard={!!isAuthenticated}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>
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
