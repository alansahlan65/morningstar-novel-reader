import type { NovelPart, ReadingProgress } from "../types/novel";
import { getProgressKey, type ProgressMap } from "./storage";

export function getChapterProgress(
  progressMap: ProgressMap,
  partId: string,
  chapterId: string
): ReadingProgress | undefined {
  return progressMap[getProgressKey(partId, chapterId)];
}

export function getChapterStatus(
  progressMap: ProgressMap,
  partId: string,
  chapterId: string
): "Not started" | "Reading" | "Complete" {
  const progress = getChapterProgress(progressMap, partId, chapterId);

  if (!progress) {
    return "Not started";
  }

  return progress.progressPercent >= 95 ? "Complete" : "Reading";
}

export function getPartProgressPercent(
  part: NovelPart,
  progressMap: ProgressMap
): number {
  if (part.chapters.length === 0) {
    return 0;
  }

  const total = part.chapters.reduce((sum, chapter) => {
    return (
      sum +
      (getChapterProgress(progressMap, part.id, chapter.id)?.progressPercent ?? 0)
    );
  }, 0);

  return Math.round(total / part.chapters.length);
}

export function getPartStatus(
  part: NovelPart,
  progressMap: ProgressMap
): "Not started" | "Reading" | "Complete" {
  const percent = getPartProgressPercent(part, progressMap);

  if (percent >= 95) {
    return "Complete";
  }

  return percent > 0 ? "Reading" : "Not started";
}

export function getLatestProgressForPart(
  part: NovelPart,
  progressMap: ProgressMap
): ReadingProgress | undefined {
  return part.chapters
    .map((chapter) => getChapterProgress(progressMap, part.id, chapter.id))
    .filter((progress): progress is ReadingProgress => Boolean(progress))
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )[0];
}
