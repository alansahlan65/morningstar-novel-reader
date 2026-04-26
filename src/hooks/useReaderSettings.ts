import { useState } from "react";
import {
  getReaderSettings,
  resetReaderSettings,
  saveReaderSettings,
  type ReaderSettings
} from "../utils/storage";

export function useReaderSettings() {
  const [settings, setSettingsState] = useState<ReaderSettings>(() =>
    getReaderSettings()
  );

  function setSettings(next: Partial<ReaderSettings>) {
    saveReaderSettings(next);
    setSettingsState(getReaderSettings());
  }

  function resetSettings() {
    resetReaderSettings();
    setSettingsState(getReaderSettings());
  }

  return { settings, setSettings, resetSettings };
}
