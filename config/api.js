import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { waitForConfig } from "./appConfig";


export const APP_KEY = process.env.EXPO_PUBLIC_APP_KEY;

export const api = axios.create();

api.interceptors.request.use(
  async (config) => {
    const remoteConfig = await waitForConfig();

    config.baseURL = remoteConfig.apiUrl;
    config.headers = config.headers || {};
    config.headers["Content-Type"] = "application/json";

    const token = await AsyncStorage.getItem("@ruangkerja:accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);
