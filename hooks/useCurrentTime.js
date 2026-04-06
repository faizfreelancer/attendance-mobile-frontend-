import { useEffect, useState } from "react";

function getTimeString() {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function useCurrentTime() {
  const [currentTime, setCurrentTime] = useState(getTimeString);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getTimeString());
    }, 10_000);
    return () => clearInterval(interval);
  }, []);

  return currentTime;
}
