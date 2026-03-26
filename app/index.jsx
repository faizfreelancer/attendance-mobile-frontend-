import { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ONBOARDING_KEY = "hasSeenOnboarding";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    checkOnboarding();
  }, []);

  const checkOnboarding = async () => {
    try {
      const seen = await AsyncStorage.getItem(ONBOARDING_KEY);
      if (seen === "true") {
        // Sudah pernah onboarding → langsung ke login
        router.replace("/(auth)");
      } else {
        // Pertama kali buka → tampilkan onboarding
        router.replace("/onboarding");
      }
    } catch {
     
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#3b5bdb" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4ff",
  },
});
