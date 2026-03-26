import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "@/context/authContext";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const { signInWithGoogle } = useAuth();
  const router = useRouter();
  
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      Alert.alert("Login Gagal", error.message || "Terjadi kesalahan saat login. Silakan coba lagi.");
      console.log(error.message);
      
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 20 }}>
      <TouchableOpacity onPress={handleGoogleSignIn}>
        <Text
          style={{
            fontSize: 18,
            color: "#fff",
            backgroundColor: "#4285F4",
            padding: 10,
            borderRadius: 5,
          }}
        >
          Masuk dengan Google
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/onboarding")}>
        <Text
          style={{
            fontSize: 18,
            color: "#fff",
            backgroundColor: "#4285F4",
            padding: 10,
            borderRadius: 5,
          }}
        >
          kehalaman onboarding
        </Text>
      </TouchableOpacity>
    </View>
  );
}