import { checkLocation } from "@/services/authServices";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function CheckInScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [distance, setDistance] = useState([]);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Izin lokasi ditolak");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  // Ambil lat & long dari object location
  const latitude = location?.coords?.latitude;
  const longitude = location?.coords?.longitude;

  const handleCheckLocation = async () => {
    try {
      const  result  = await checkLocation(latitude, longitude);
      setDistance(result.distance);
    } catch (error) {
      setErrorMsg(error.message);
      // Log detail error dari server
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data); // ← pesan error dari backend
      console.log("Headers:", error.response?.headers);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {errorMsg ? (
        <Text style={{ color: "red" }}>{errorMsg}</Text>
      ) : location ? (
        <View style={{ alignItems: "center", gap: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Lokasi Saat Ini
          </Text>
          <Text style={{ fontSize: 14 }}>Latitude: {latitude}</Text>
          <Text style={{ fontSize: 14 }}>Longitude: {longitude}</Text>
          <TouchableOpacity
            style={{ backgroundColor: "blue", padding: 10, borderRadius: 5 }}
            onPress={handleCheckLocation}
          >
            <Text style={{ color: "white" }}>Check radius antara kantor</Text>
          </TouchableOpacity>
          <Text>{distance}</Text>
        </View>
      ) : (
        <Text>Mengambil lokasi...</Text>
      )}
    </View>
  );
}
