import { api, APP_KEY } from "../config/api";

export async function loginWithGoogle(accessToken) {
  const { data } = await api.get(
    "/auth/login/google",
    {
      params: {
        appKey: APP_KEY,
        access_token: accessToken,
      },
    },
  );
  

  return data;
}


export async function getMyAccount(token) {
  const { data } = await api.get("account/my/accounts", {
    params: {
      appKey: APP_KEY,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export async function getProfile(token) {
  const { data } = await api.get("/dev/account/me", {
    params: {
      appKey: APP_KEY,
      token: token,
    },
  });
  return data;
}
