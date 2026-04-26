import { uiCopy } from "../content/uiCopy";
import type { ThemePreference, ReaderSettings } from "../utils/storage";
import { Button } from "./Button";
import { SegmentedControl } from "./SegmentedControl";
import { Sheet } from "./Sheet";

type ReaderSettingsSheetProps = {
  open: boolean;
  settings: ReaderSettings;
  themePreference: ThemePreference;
  onClose: () => void;
  onReset: () => void;
  onSettingsChange: (settings: Partial<ReaderSettings>) => void;
  onThemeChange: (theme: ThemePreference) => void;
};

export function ReaderSettingsSheet({
  open,
  settings,
  themePreference,
  onClose,
  onReset,
  onSettingsChange,
  onThemeChange
}: ReaderSettingsSheetProps) {
  return (
    <Sheet
      description="Adjust the reader without changing the manuscript text."
      onClose={onClose}
      open={open}
      title="Reading style"
    >
      <div className="settings-grid">
        <SegmentedControl
          label="Theme"
          onChange={onThemeChange}
          options={[
            { label: "System", value: "system" },
            { label: "Light", value: "light" },
            { label: "Dark", value: "dark" }
          ]}
          value={themePreference}
        />
        <SegmentedControl
          label="Font size"
          onChange={(fontSize) => onSettingsChange({ fontSize })}
          options={[
            { label: "Small", value: "small" },
            { label: "Default", value: "default" },
            { label: "Large", value: "large" },
            { label: "XL", value: "xl" }
          ]}
          value={settings.fontSize}
        />
        <SegmentedControl
          label="Font family"
          onChange={(fontFamily) => onSettingsChange({ fontFamily })}
          options={[
            { label: "Serif", value: "serif" },
            { label: "Sans", value: "sans" },
            { label: "Dyslexia", value: "dyslexia" }
          ]}
          value={settings.fontFamily}
        />
        <SegmentedControl
          label="Line height"
          onChange={(lineHeight) => onSettingsChange({ lineHeight })}
          options={[
            { label: "Compact", value: "compact" },
            { label: "Comfortable", value: "comfortable" },
            { label: "Spacious", value: "spacious" }
          ]}
          value={settings.lineHeight}
        />
        <SegmentedControl
          label="Text alignment"
          onChange={(textAlign) => onSettingsChange({ textAlign })}
          options={[
            { label: "Justified", value: "justified" },
            { label: "Left", value: "left" }
          ]}
          value={settings.textAlign}
        />
        <SegmentedControl
          label="Reader width"
          onChange={(width) => onSettingsChange({ width })}
          options={[
            { label: "Narrow", value: "narrow" },
            { label: "Default", value: "default" },
            { label: "Wide", value: "wide" }
          ]}
          value={settings.width}
        />
      </div>
      <div className="sheet-actions">
        <Button onClick={onReset} type="button" variant="secondary">
          {uiCopy.resetReadingStyle}
        </Button>
        <Button onClick={onClose} type="button">
          {uiCopy.saveSettings}
        </Button>
      </div>
    </Sheet>
  );
}
