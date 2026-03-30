import { useAuth } from "@/context/authContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const { signInWithGoogle } = useAuth();
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      Alert.alert(
        "Login Gagal",
        error.message || "Terjadi kesalahan saat login. Silakan coba lagi.",
      );
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(tabs)/home");
    }
  }, [isAuthenticated]);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header biru — lebih tinggi supaya card bisa overlap */}
      <View style={styles.header}>
        <View style={styles.logoWrap}>
          <Image
            source={require("../../assets/images/icon-putih.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.appName}>Attendance</Text>
      </View>

      {/* Card mengambang yang overlap header */}
      <View style={styles.card}>
        <Text variant="titleLarge" style={styles.loginTitle}>
          Masuk ke Akun Kamu
        </Text>
        <Text variant="bodyMedium" style={styles.loginSub}>
          Gunakan akun Google kantor untuk masuk dan mulai mencatat kehadiranmu
          hari ini.
        </Text>

        {/* Tombol Google */}
        <TouchableOpacity
          style={styles.btnGoogle}
          onPress={handleGoogleSignIn}
          activeOpacity={0.85}
        >
          <Image
            source={require("../../assets/images/google.png")}
            style={styles.logoGoogle}
            resizeMode="contain"
          />
          <Text style={styles.btnGoogleText}>Masuk dengan Google</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
        </View>

        {/* Syarat & Ketentuan */}
        <Text variant="bodySmall" style={styles.terms}>
          Dengan masuk, kamu menyetujui{" "}
          <Text style={styles.termsLink}>Syarat &amp; Ketentuan</Text> dan{" "}
          <Text style={styles.termsLink}>Kebijakan Privasi</Text> perusahaan.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f0f4ff", // warna background di bawah card
  },

  // ── Header ──────────────────────────────────────────
  header: {
    backgroundColor: "#1033c0",
    paddingTop: 48,
    paddingBottom: 70, // padding ekstra → ruang untuk card overlap
    alignItems: "center",
  },
  logoWrap: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  appName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 10,
    color: "rgba(255,255,255,0.55)",
    letterSpacing: 2,
    marginTop: 4,
  },

  // ── Card ────────────────────────────────────────────
  card: {
    marginHorizontal: 20,
    marginTop: -50, // ← kunci: tarik ke atas supaya overlap header
    backgroundColor: "#ffffff",
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 24,
    alignItems: "center",
    // Shadow iOS
    shadowColor: "#3b5bdb",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    // Shadow Android
    elevation: 8,
  },

  // ── Konten dalam card ────────────────────────────────
  loginTitle: {
    fontWeight: "800",
    color: "#1a2340",
    textAlign: "center",
    marginBottom: 10,
  },
  loginSub: {
    color: "#8492b0",
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 28,
    paddingHorizontal: 8,
  },
  logoGoogle: {
    width: 20,
    height: 20,
  },
  btnGoogle: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#dde3f0",
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 12,
    shadowColor: "#3b5bdb",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  btnGoogleText: {
    fontSize: 14.5,
    fontWeight: "700",
    color: "#1a2340",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: "100%",
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 0.5,
    backgroundColor: "#e8ecf5",
  },
  dividerText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#b0bbd4",
    letterSpacing: 1.5,
  },
  terms: {
    color: "#b0bbd4",
    textAlign: "center",
    lineHeight: 18,
  },
  termsLink: {
    color: "#3b5bdb",
    fontWeight: "600",
  },
});
