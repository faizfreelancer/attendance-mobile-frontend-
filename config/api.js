import axios from "axios";

export const APP_KEY = process.env.EXPO_PUBLIC_APP_KEY;

const apiAuth = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});


export default apiAuth;
