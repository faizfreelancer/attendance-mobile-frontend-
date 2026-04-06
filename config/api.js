import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAppConfig } from "./appConfig";

export const APP_KEY = process.env.EXPO_PUBLIC_APP_KEY;

export const apiAuth = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_LOCAL_URL,
  headers: { "Content-Type": "application/json" },
});

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_LOCAL_URL,
  headers: { "Content-Type": "application/json" },
});

// Interceptor: ambil token dari AsyncStorage sebelum setiap request
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("@ruangkerja:accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

