import type { NovelBlock } from "../types/novel";

export type ParsedChapter = {
  id: string;
  title: string;
  blocks: NovelBlock[];
};

export type ParsedManuscript = {
  number: string;
  title: string;
  thematicLine: string;
  chapters: ParsedChapter[];
};

const CHAPTER_TITLE_PATTERN = /^[A-Z0-9IVXLCDM ,'.:;!?-]+$/;

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function isChapterTitle(value: string): boolean {
  const trimmed = value.trim();
  return (
    trimmed.length > 0 &&
    trimmed.length <= 90 &&
    /[A-Z]/.test(trimmed) &&
    CHAPTER_TITLE_PATTERN.test(trimmed)
  );
}

export function isSectionBreak(value: string): boolean {
  return /^\*\s+\*\s+\*$/.test(value.trim());
}

export function parseManuscriptText(text: string): ParsedManuscript {
  const lines = text
    .split(/\r?\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  const [number = "", title = "", thematicLine = "", ...body] = lines;
  const chapters: ParsedChapter[] = [];

  for (const line of body) {
    if (isChapterTitle(line)) {
      chapters.push({
        id: slugify(line),
        title: line,
        blocks: [{ type: "chapter-title", title: line }]
      });
      continue;
    }

    if (chapters.length === 0) {
      continue;
    }

    const blocks = chapters[chapters.length - 1].blocks;
    blocks.push(isSectionBreak(line) ? { type: "section-break" } : { type: "paragraph", text: line });
  }

  return {
    number,
    title,
    thematicLine,
    chapters
  };
}
