import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
   <><View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 16, marginTop: 10 }}>Ini adalah halaman utama aplikasi absensi.</Text>
    </View>
   </>
  );
}