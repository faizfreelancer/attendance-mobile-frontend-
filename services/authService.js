import { api, apiAuth, APP_KEY } from "../config/api";

export async function loginWithGoogle(accessToken) {
  console.log(accessToken);

  const { data } = await apiAuth.post(
    "/auth/google",
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (data.message !== "Login berhasil") {
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
