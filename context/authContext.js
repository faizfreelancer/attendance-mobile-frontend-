import { collectInHrm, getMyAccount, getProfile, loginWithGoogle } from "@/services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { STORAGE_KEYS } from "../constants/storageKey";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
      offlineAccess: true,
    });

    loadStoredSession();
  }, []);

  const loadStoredSession = async () => {
    try {
      const [storedToken, storedUser] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
        AsyncStorage.getItem(STORAGE_KEYS.USER_DATA),
      ]);

      if (storedToken && storedUser) {
        setAccessToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.warn("Gagal memuat sesi tersimpan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSession = async (token, userData) => {
    await Promise.all([
      AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token),
      AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData)),
    ]);
  };

  const clearSession = async () => {
    await Promise.all([
      AsyncStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN),
      AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA),
    ]);
  };

  const signInWithGoogle = useCallback(async () => {
    setIsLoading(true);
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      await GoogleSignin.signIn();

      const tokens = await GoogleSignin.getTokens();
      const googleAccessToken = tokens.accessToken;
      console.log(googleAccessToken);

      if (!googleAccessToken) {
        throw new Error("Gagal mendapatkan access token dari Google.");
      }

      const loginWithGoogleResponse = await loginWithGoogle(googleAccessToken);
      const myAccountREsponse = await getMyAccount(loginWithGoogleResponse.accessToken);

      setAccessToken(myAccountREsponse.accessToken);
      setUser(loginWithGoogleResponse.data.client);
      await saveSession(myAccountREsponse.accessToken, loginWithGoogleResponse.data.client);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    setIsLoading(true);
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.warn("Error saat sign out:", error);
    } finally {
      await clearSession();
      setUser(null);
      setAccessToken(null);
      setIsLoading(false);
    }
  }, []);

  const fetchProfile = useCallback(async () => {
    const storedToken = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (!storedToken) return;
    try {
      const profile = await getProfile(storedToken);
      setUser(profile.data);
    } catch (error) {
      console.warn("Gagal mengambil profil:", error);
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isLoading,
        isAuthenticated: !!user && !!accessToken,
        signInWithGoogle,
        signOut,
        fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus digunakan di dalam <AuthProvider>");
  }
  return context;
}
