import { api } from "../config/api";

export async function checkLocation(lat, long) {
  const { data } = await api.post("/attendance/validasi-gps", {
    lat: parseFloat(lat),
    long: parseFloat(long),
  });

  if (data.message !== "Validasi GPS berhasil") {
    throw new Error(
      "Lokasi tidak valid. Pastikan GPS Anda aktif dan berada di area kantor.",
    );
  }
  return data;
}
