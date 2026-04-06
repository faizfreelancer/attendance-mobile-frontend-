import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { checkLocation } from "../services/locationService";

export function useLocationCheck() {
  const [location, setLocation] = useState(null);
  const [isInRange, setIsInRange] = useState(null); // null = loading, true, false
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setLocationError("Izin lokasi ditolak");
          setIsInRange(false);
          return;
        }

        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        setLocation(loc);

        const { latitude, longitude } = loc.coords;
        const result = await checkLocation(latitude, longitude);
        setIsInRange(result.message === "Validasi GPS berhasil");
      } catch (e) {
        setLocationError(e.message);
        setIsInRange(false);
      }
    })();
  }, []);

  return { location, isInRange, locationError };
}
