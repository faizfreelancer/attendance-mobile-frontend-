import { Platform } from "react-native";
import { api } from "../config/api";

export async function checkIn(lat, long, notes, photo, tasks) {
  const formData = new FormData();

  formData.append("lat", String(lat));
  formData.append("long", String(long));
  formData.append("note", String(notes));
  formData.append("tasks", JSON.stringify(tasks));

  formData.append("photo", {
    uri:
      Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", ""),
    name: "photo.jpg",
    type: "image/jpeg",
  });

  const { data } = await api.post("/attendance/check-in", formData, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
    transformRequest: (data) => data,
  });

  return data;
}
