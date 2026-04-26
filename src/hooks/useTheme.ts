import { useEffect, useMemo, useState } from "react";
import {
  getThemePreference,
  saveThemePreference,
  type ThemePreference
} from "../utils/storage";

export type ResolvedTheme = "light" | "dark";

function getSystemTheme(): ResolvedTheme {
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }

  return "light";
}

export function useTheme() {
  const [preference, setPreferenceState] = useState<ThemePreference>(() =>
    getThemePreference()
  );
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(() =>
    getSystemTheme()
  );

  const resolvedTheme = useMemo<ResolvedTheme>(
    () => (preference === "system" ? systemTheme : preference),
    [preference, systemTheme]
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => setSystemTheme(media.matches ? "dark" : "light");
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (preference === "system") {
      root.removeAttribute("data-theme");
    } else {
      root.dataset.theme = preference;
    }
    root.dataset.resolvedTheme = resolvedTheme;
  }, [preference, resolvedTheme]);

  function setPreference(next: ThemePreference) {
    setPreferenceState(next);
    saveThemePreference(next);
  }

  function toggleResolvedTheme() {
    setPreference(resolvedTheme === "dark" ? "light" : "dark");
  }

  return { preference, resolvedTheme, setPreference, toggleResolvedTheme };
}
