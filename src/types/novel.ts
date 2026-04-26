export type CoverTone = "green" | "gold" | "red" | "gray" | "black" | "sand";

export type NovelBlock =
  | { type: "part-title"; number: string; title: string; thematicLine: string }
  | { type: "chapter-title"; title: string }
  | { type: "paragraph"; text: string }
  | { type: "section-break" };

export type NovelChapter = {
  id: string;
  title: string;
  estimatedMinutes: number;
  blocks: NovelBlock[];
};

export type NovelPart = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  thematicLine: string;
  coverTone: CoverTone;
  chapters: NovelChapter[];
};

export type ReadingProgress = {
  partId: string;
  chapterId: string;
  scrollY: number;
  progressPercent: number;
  updatedAt: string;
};
