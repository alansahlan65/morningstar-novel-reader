import { generatedNovelParts } from "./novel.generated";
import type { CoverTone, NovelChapter, NovelPart } from "../types/novel";

const partMeta: Record<
  string,
  {
    subtitle: string;
    coverTone: CoverTone;
  }
> = {
  "part-1": {
    subtitle: "A road of old wounds and harder choices.",
    coverTone: "green"
  },
  "part-2": {
    subtitle: "Wine country, wolf signs, and ash.",
    coverTone: "gold"
  },
  "part-3": {
    subtitle: "A stranger waits where the crowd looks away.",
    coverTone: "red"
  },
  "part-4": {
    subtitle: "Inheritance opens under broken stone.",
    coverTone: "gray"
  },
  "part-5": {
    subtitle: "Desert myths sharpen their teeth.",
    coverTone: "sand"
  },
  "part-6": {
    subtitle: "The balance asks for a human answer.",
    coverTone: "black"
  }
};

export const novelParts: NovelPart[] = generatedNovelParts.map((part) => ({
  ...part,
  subtitle: partMeta[part.id].subtitle,
  coverTone: partMeta[part.id].coverTone
}));

export const totalChapterCount = novelParts.reduce(
  (count, part) => count + part.chapters.length,
  0
);

export function getPart(partId: string): NovelPart | undefined {
  return novelParts.find((part) => part.id === partId);
}

export function getChapter(
  partId: string,
  chapterId: string
): NovelChapter | undefined {
  return getPart(partId)?.chapters.find((chapter) => chapter.id === chapterId);
}

export function getFirstChapter(): { part: NovelPart; chapter: NovelChapter } {
  const part = novelParts[0];
  return { part, chapter: part.chapters[0] };
}

export function getChapterPosition(partId: string, chapterId: string): number {
  let position = 0;

  for (const part of novelParts) {
    for (const chapter of part.chapters) {
      position += 1;
      if (part.id === partId && chapter.id === chapterId) {
        return position;
      }
    }
  }

  return 1;
}

export function getTotalEstimatedMinutes(part: NovelPart): number {
  return part.chapters.reduce(
    (minutes, chapter) => minutes + chapter.estimatedMinutes,
    0
  );
}
