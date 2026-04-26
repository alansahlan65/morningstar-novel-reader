import { describe, expect, it } from "vitest";
import {
  DEFAULT_READER_SETTINGS,
  getLastRead,
  getProgressMap,
  getReaderSettings,
  getThemePreference,
  saveProgress,
  saveReaderSettings,
  saveThemePreference,
  STORAGE_KEYS
} from "./storage";

function createMemoryStorage(initial: Record<string, string> = {}) {
  const values = new Map(Object.entries(initial));

  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
    removeItem: (key: string) => values.delete(key),
    clear: () => values.clear()
  };
}

describe("reader storage", () => {
  it("uses stable defaults when reader settings are missing or corrupted", () => {
    expect(getReaderSettings(createMemoryStorage())).toEqual(
      DEFAULT_READER_SETTINGS
    );

    const corrupted = createMemoryStorage({
      [STORAGE_KEYS.readerSettings]: "{not json"
    });

    expect(getReaderSettings(corrupted)).toEqual(DEFAULT_READER_SETTINGS);
  });

  it("saves theme and reader settings without losing defaults", () => {
    const storage = createMemoryStorage();

    saveThemePreference("dark", storage);
    saveReaderSettings({ fontSize: "xl", lineHeight: "spacious" }, storage);

    expect(getThemePreference(storage)).toBe("dark");
    expect(getReaderSettings(storage)).toEqual({
      ...DEFAULT_READER_SETTINGS,
      fontSize: "xl",
      lineHeight: "spacious"
    });
  });

  it("persists progress by chapter and updates the last-read pointer", () => {
    const storage = createMemoryStorage();

    saveProgress(
      {
        partId: "part-1",
        chapterId: "the-ground-that-remembers",
        scrollY: 420,
        progressPercent: 37,
        updatedAt: "2026-04-26T10:00:00.000Z"
      },
      storage
    );

    expect(getProgressMap(storage)).toEqual({
      "part-1:the-ground-that-remembers": {
        partId: "part-1",
        chapterId: "the-ground-that-remembers",
        scrollY: 420,
        progressPercent: 37,
        updatedAt: "2026-04-26T10:00:00.000Z"
      }
    });
    expect(getLastRead(storage)).toEqual({
      partId: "part-1",
      chapterId: "the-ground-that-remembers",
      scrollY: 420,
      progressPercent: 37,
      updatedAt: "2026-04-26T10:00:00.000Z"
    });
  });
});
