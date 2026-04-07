import { Stack, useRootNavigationState } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { AuthProvider, useAuth } from "../context/authContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { loadAppConfig } from "@/config/appConfig";

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
  const { isAuthenticated} = useAuth();
  const navigationState = useRootNavigationState();

   useEffect(() => {
     loadAppConfig(); // panggil sekali di sini, paling awal
   }, []);

  useEffect(() => {
    if (!navigationState?.key) return;
    SplashScreen.hideAsync();
  }, [navigationState?.key, isAuthenticated]);

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Protected guard={!!isAuthenticated}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>
      </Stack>
      </SafeAreaProvider>
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
