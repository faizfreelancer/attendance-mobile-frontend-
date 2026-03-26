import { api, apiAuth, APP_KEY } from "@/config/api";

/**
 * Login dengan Google access token ke API RuangKerja
 */
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

export async function createUserInBackend(userData) {
  const { data } = await api.post("/auth/login", {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
  });

  
  if (data.message === "Data user sudah ada di Database") {
    return null; // User sudah ada, tidak perlu buat baru
  }
  if (data.message !== "User baru   berhasil dibuat") {
    throw new Error("Gagal membuat user di backend. Silakan coba lagi.");
  }
}
