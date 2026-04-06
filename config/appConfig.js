let appConfig = null;

export const loadAppConfig = async () => {
  try {
    const response = await fetch(
      "https://dev.maya.id/faiz/static/attendance.config.json",
    );

    appConfig = await response.json();

    return appConfig;
  } catch (error) {
    console.error("Config load failed:", error);
    throw error;
  }
};

export const getAppConfig = () => appConfig;
