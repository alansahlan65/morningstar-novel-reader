import type { NovelBlock } from "../types/novel";

export type ParagraphSplitOptions = {
  maxSentencesPerParagraph: number;
  longParagraphWordThreshold: number;
  targetWordsPerParagraph: number;
};

const DEFAULT_OPTIONS: ParagraphSplitOptions = {
  maxSentencesPerParagraph: 3,
  longParagraphWordThreshold: 95,
  targetWordsPerParagraph: 85
};

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function splitSentences(text: string): string[] {
  const matches = text.match(/[^.!?]+[.!?]["”’']?|[^.!?]+$/g) ?? [text];
  return matches.map((sentence) => sentence.trim()).filter(Boolean);
}

export function splitLongParagraphText(
  text: string,
  options: Partial<ParagraphSplitOptions> = {}
): string[] {
  const settings = { ...DEFAULT_OPTIONS, ...options };
  const sentences = splitSentences(text);

  if (
    sentences.length <= settings.maxSentencesPerParagraph ||
    countWords(text) < settings.longParagraphWordThreshold
  ) {
    return [text];
  }

  const paragraphs: string[] = [];
  let current: string[] = [];
  let currentWords = 0;

  for (const sentence of sentences) {
    const sentenceWords = countWords(sentence);
    const wouldExceedSentenceLimit =
      current.length >= settings.maxSentencesPerParagraph;
    const wouldExceedWordTarget =
      current.length > 0 &&
      currentWords + sentenceWords > settings.targetWordsPerParagraph;

    if (wouldExceedSentenceLimit || wouldExceedWordTarget) {
      paragraphs.push(current.join(" "));
      current = [];
      currentWords = 0;
    }

    current.push(sentence);
    currentWords += sentenceWords;
  }

  if (current.length > 0) {
    paragraphs.push(current.join(" "));
  }

  return paragraphs;
}

export function splitLongParagraphBlocks(
  blocks: NovelBlock[],
  options?: Partial<ParagraphSplitOptions>
): NovelBlock[] {
  return blocks.reduce<NovelBlock[]>((result, block) => {
    if (block.type !== "paragraph") {
      result.push(block);
      return result;
    }

    for (const text of splitLongParagraphText(block.text, options)) {
      result.push({ type: "paragraph", text });
    }

    return result;
  }, []);
}
