import { uiCopy } from "../content/uiCopy";
import type { ResolvedTheme } from "../hooks/useTheme";
import { IconButton } from "./Button";
import { BookIcon, ListIcon, SettingsIcon } from "./icons";
import { SegmentedControl } from "./SegmentedControl";
import { ThemeToggle } from "./ThemeToggle";

type ReaderMode = "read" | "listen";

type ReaderBottomBarProps = {
  mode: ReaderMode;
  progressPercent: number;
  resolvedTheme: ResolvedTheme;
  onModeChange: (mode: ReaderMode) => void;
  onOpenSettings: () => void;
  onOpenToc: () => void;
  onToggleTheme: () => void;
};

export function ReaderBottomBar({
  mode,
  progressPercent,
  resolvedTheme,
  onModeChange,
  onOpenSettings,
  onOpenToc,
  onToggleTheme
}: ReaderBottomBarProps) {
  return (
    <nav className="reader-bottom-bar" aria-label="Reader controls">
      <span className="reader-bottom-bar__chip">
        <BookIcon />
        {Math.round(progressPercent)}%
      </span>
      <SegmentedControl
        label="Reader mode"
        onChange={onModeChange}
        options={[
          { label: uiCopy.read, value: "read" },
          { label: uiCopy.listen, value: "listen" }
        ]}
        showLabel={false}
        value={mode}
      />
      <ThemeToggle onToggle={onToggleTheme} resolvedTheme={resolvedTheme} />
      <IconButton label="Reading style" onClick={onOpenSettings} type="button">
        <SettingsIcon />
      </IconButton>
      <IconButton label="Table of contents" onClick={onOpenToc} type="button">
        <ListIcon />
      </IconButton>
    </nav>
  );
}
