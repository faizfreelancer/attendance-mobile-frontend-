import { api, apiAuth, APP_KEY } from "@/config/api";

export async function loginWithGoogle(accessToken) {
  const { data } = await apiAuth.get("/auth/login/google", {
    params: {
      appKey: APP_KEY,
      access_token: accessToken,
    },
  });

  if (data.result !== "success") {
    throw new Error("Login tidak berhasil. Silakan coba lagi.");
  }

  return data;
}

export async function getProfile(token) {
  const { data } = await apiAuth.get("/dev/account/me", {
    params: {
      appKey: APP_KEY,
      token: token,
    },
  });
  return data;
}

export async function createUserInBackend(userData) {
  const { data } = await api.post("/auth/login", {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
  });

  if (
    data.message === "Data user sudah ada di Database" ||
    data.message === "User baru berhasil dibuat"
  ) {
    return null; // User sudah ada, tidak perlu buat baru
  } else {
    throw new Error("Gagal membuat user di backend. Silakan coba lagi.");
  }
}

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
