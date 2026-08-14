"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/trips";

type Theme = "light" | "dark";

const STORAGE_KEY = "travel-log-theme";

const LABELS: Record<Locale, Record<Theme, string>> = {
  zh: {
    light: "切换到浅色模式",
    dark: "切换到深色模式",
  },
  en: {
    light: "Switch to light theme",
    dark: "Switch to dark theme",
  },
};

function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

function readSavedTheme(): Theme | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return isTheme(value) ? value : null;
  } catch (error) {
    console.warn("Unable to read the saved theme preference.", error);
    return null;
  }
}

function applyTheme(theme: Theme, source: "system" | "user") {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.dataset.themeSource = source;
  root.style.colorScheme = theme;
}

export default function ThemeToggle({ locale }: { locale: Locale }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const savedTheme = readSavedTheme();
    const initialTheme =
      savedTheme ?? (media.matches ? "dark" : "light");

    applyTheme(initialTheme, savedTheme ? "user" : "system");
    setTheme(initialTheme);

    function handleSystemThemeChange(event: MediaQueryListEvent) {
      if (readSavedTheme()) return;
      const systemTheme = event.matches ? "dark" : "light";
      applyTheme(systemTheme, "system");
      setTheme(systemTheme);
    }

    media.addEventListener("change", handleSystemThemeChange);
    return () => media.removeEventListener("change", handleSystemThemeChange);
  }, []);

  const nextTheme = theme === "dark" ? "light" : "dark";
  const label = LABELS[locale][nextTheme];

  function handleToggle() {
    applyTheme(nextTheme, "user");
    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch (error) {
      console.warn("Unable to save the theme preference.", error);
    }
    setTheme(nextTheme);
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={handleToggle}
      aria-label={label}
      title={label}
    >
      <svg className="theme-icon theme-icon-sun" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
      </svg>
      <svg className="theme-icon theme-icon-moon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.3 15.1A8.5 8.5 0 018.9 3.7 8.5 8.5 0 1020.3 15.1z" />
      </svg>
    </button>
  );
}
