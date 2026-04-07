let configPromise = null;

export const loadAppConfig = () => {
  if (!configPromise) {
    console.log("🔄 Fetching config...");
    configPromise = fetch(
      "https://dev.maya.id/faiz/static/attendance.config.json",
    )
      .then((res) => {
        console.log("📡 Config response status:", res.status);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("✅ Config loaded:", data);
        return data;
      })
      .catch((err) => {
        console.log("❌ Config failed:", err.message);
        configPromise = null;
        throw err;
      });
  }
  return configPromise;
};

export const waitForConfig = () => {
  if (!configPromise) throw new Error("loadAppConfig() belum dipanggil");
  return configPromise;
};
