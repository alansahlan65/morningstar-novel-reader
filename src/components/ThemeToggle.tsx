import type { ResolvedTheme } from "../hooks/useTheme";
import { IconButton } from "./Button";
import { MoonIcon, SunIcon } from "./icons";

type ThemeToggleProps = {
  resolvedTheme: ResolvedTheme;
  onToggle: () => void;
};

export function ThemeToggle({ resolvedTheme, onToggle }: ThemeToggleProps) {
  const isDark = resolvedTheme === "dark";

  return (
    <IconButton
      aria-pressed={isDark}
      label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={onToggle}
      type="button"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  );
}
