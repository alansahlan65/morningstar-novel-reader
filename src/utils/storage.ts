import type { ReadingProgress } from "../types/novel";

export const STORAGE_KEYS = {
  theme: "morningstar.theme",
  readerSettings: "morningstar.readerSettings",
  progress: "morningstar.progress",
  lastRead: "morningstar.lastRead"
} as const;

export type ThemePreference = "system" | "light" | "dark";
export type FontSizeSetting = "small" | "default" | "large" | "xl";
export type FontFamilySetting = "serif" | "sans" | "dyslexia";
export type LineHeightSetting = "compact" | "comfortable" | "spacious";
export type TextAlignSetting = "justified" | "left";
export type ReaderWidthSetting = "narrow" | "default" | "wide";

export type ReaderSettings = {
  fontSize: FontSizeSetting;
  fontFamily: FontFamilySetting;
  lineHeight: LineHeightSetting;
  textAlign: TextAlignSetting;
  width: ReaderWidthSetting;
};

export type ProgressMap = Record<string, ReadingProgress>;

export type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export const DEFAULT_READER_SETTINGS: ReaderSettings = {
  fontSize: "default",
  fontFamily: "serif",
  lineHeight: "comfortable",
  textAlign: "justified",
  width: "default"
};

const THEMES: ThemePreference[] = ["system", "light", "dark"];
const FONT_SIZES: FontSizeSetting[] = ["small", "default", "large", "xl"];
const FONT_FAMILIES: FontFamilySetting[] = ["serif", "sans", "dyslexia"];
const LINE_HEIGHTS: LineHeightSetting[] = ["compact", "comfortable", "spacious"];
const TEXT_ALIGNS: TextAlignSetting[] = ["justified", "left"];
const WIDTHS: ReaderWidthSetting[] = ["narrow", "default", "wide"];

function getStorage(storage?: StorageLike): StorageLike | null {
  if (storage) {
    return storage;
  }

  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
}

function readJson<T>(key: string, fallback: T, storage?: StorageLike): T {
  const target = getStorage(storage);
  if (!target) {
    return fallback;
  }

  try {
    const raw = target.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T, storage?: StorageLike): void {
  const target = getStorage(storage);
  if (!target) {
    return;
  }

  target.setItem(key, JSON.stringify(value));
}

function includes<T extends string>(values: readonly T[], value: unknown): value is T {
  return typeof value === "string" && values.includes(value as T);
}

export function getThemePreference(storage?: StorageLike): ThemePreference {
  const target = getStorage(storage);
  const value = target?.getItem(STORAGE_KEYS.theme);
  return includes(THEMES, value) ? value : "system";
}

export function saveThemePreference(
  theme: ThemePreference,
  storage?: StorageLike
): void {
  const target = getStorage(storage);
  if (!target) {
    return;
  }

  target.setItem(STORAGE_KEYS.theme, theme);
}

export function getReaderSettings(storage?: StorageLike): ReaderSettings {
  const saved = readJson<Partial<ReaderSettings>>(
    STORAGE_KEYS.readerSettings,
    {},
    storage
  );

  return {
    fontSize: includes(FONT_SIZES, saved.fontSize)
      ? saved.fontSize
      : DEFAULT_READER_SETTINGS.fontSize,
    fontFamily: includes(FONT_FAMILIES, saved.fontFamily)
      ? saved.fontFamily
      : DEFAULT_READER_SETTINGS.fontFamily,
    lineHeight: includes(LINE_HEIGHTS, saved.lineHeight)
      ? saved.lineHeight
      : DEFAULT_READER_SETTINGS.lineHeight,
    textAlign: includes(TEXT_ALIGNS, saved.textAlign)
      ? saved.textAlign
      : DEFAULT_READER_SETTINGS.textAlign,
    width: includes(WIDTHS, saved.width)
      ? saved.width
      : DEFAULT_READER_SETTINGS.width
  };
}

export function saveReaderSettings(
  settings: Partial<ReaderSettings>,
  storage?: StorageLike
): void {
  writeJson(
    STORAGE_KEYS.readerSettings,
    { ...getReaderSettings(storage), ...settings },
    storage
  );
}

export function resetReaderSettings(storage?: StorageLike): void {
  const target = getStorage(storage);
  target?.removeItem(STORAGE_KEYS.readerSettings);
}

export function getProgressKey(partId: string, chapterId: string): string {
  return `${partId}:${chapterId}`;
}

export function getProgressMap(storage?: StorageLike): ProgressMap {
  const saved = readJson<ProgressMap>(STORAGE_KEYS.progress, {}, storage);
  return saved && typeof saved === "object" ? saved : {};
}

export function getLastRead(storage?: StorageLike): ReadingProgress | null {
  return readJson<ReadingProgress | null>(STORAGE_KEYS.lastRead, null, storage);
}

export function saveProgress(
  progress: ReadingProgress,
  storage?: StorageLike
): void {
  const map = {
    ...getProgressMap(storage),
    [getProgressKey(progress.partId, progress.chapterId)]: progress
  };

  writeJson(STORAGE_KEYS.progress, map, storage);
  writeJson(STORAGE_KEYS.lastRead, progress, storage);
}
