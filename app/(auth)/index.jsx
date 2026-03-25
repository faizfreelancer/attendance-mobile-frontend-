import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "@/context/authContext";

export default function LoginScreen() {
  const { signInWithGoogle } = useAuth();
  
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      Alert.alert("Login Gagal", error.message || "Terjadi kesalahan saat login. Silakan coba lagi.");
      console.log(error.message);
      
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity onPress={handleGoogleSignIn}>
        <Text style={{ fontSize: 18, color: "#fff", backgroundColor: "#4285F4", padding: 10, borderRadius: 5 }}>
          Masuk dengan Google
        </Text>
      </TouchableOpacity>
    </View>
  );
}