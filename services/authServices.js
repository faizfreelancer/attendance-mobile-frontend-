import apiAuth, { APP_KEY } from "@/config/api";

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

export async function fetchProfile(token) {
  const { data } = await apiAuth.get("/auth/profile", {
    params: {
      appKey: APP_KEY,
      token: token,
    },
  });

  return data;
}

