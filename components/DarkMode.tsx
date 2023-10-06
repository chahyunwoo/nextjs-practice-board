"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const getCookieValue = (name: string) => {
  const value = ("; " + document.cookie)
    .split(`; ${name}=`)
    .pop()
    ?.split(";")[0];
  return value ?? "";
};

const setCookie = (name: string, value: string, maxAge = 3600 * 24 * 30) => {
  document.cookie = `${name}=${value}; max-age=${maxAge}`;
};

export default function DarkMode() {
  const [mode, setMode] = useState("light");
  const router = useRouter();

  useEffect(() => {
    const currentMode = getCookieValue("mode");
    if (!currentMode) {
      setCookie("mode", "light");
    }
    setMode(currentMode || "light");
  }, []);

  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setCookie("mode", newMode);
    setMode(newMode);
    router.refresh();
  };

  return (
    <span className="pl-5 text-xl cursor-pointer" onClick={toggleMode}>
      {mode === "light" ? "🌙" : "☀️"}
    </span>
  );
}
