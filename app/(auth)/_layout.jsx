import { useAuth } from "@/context/authContext";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function ProtectedLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter()
  useEffect(()=>{
    if (isAuthenticated) {
      router.replace("/(tabs)/home");
    }
  },[isAuthenticated])
  return <Stack screenOptions={{ headerShown: false }} />;
}
