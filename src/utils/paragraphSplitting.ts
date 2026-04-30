import type { NovelBlock } from "../types/novel";

export type ParagraphSplitOptions = {
  maxDialoguesPerParagraph: number;
  maxSentencesPerParagraph: number;
  longParagraphWordThreshold: number;
  targetWordsPerParagraph: number;
};

const DEFAULT_OPTIONS: ParagraphSplitOptions = {
  maxDialoguesPerParagraph: 2,
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

export function countDialogueSpans(text: string): number {
  const curlyQuotes = text.match(/“[^”]+”/g)?.length ?? 0;
  const straightQuotes = text.match(/"[^"]+"/g)?.length ?? 0;
  return curlyQuotes + straightQuotes;
}

function splitDialogueDenseSentence(sentence: string, maxDialogues: number): string[] {
  const quoteMatches = [
    ...sentence.matchAll(/“[^”]+”|"[^"]+"/g)
  ];

  if (quoteMatches.length <= maxDialogues) {
    return [sentence];
  }

  const chunks: string[] = [];
  let chunkStart = 0;
  let dialogueCount = 0;

  for (const quoteMatch of quoteMatches) {
    if (dialogueCount >= maxDialogues && quoteMatch.index !== undefined) {
      const chunk = sentence.slice(chunkStart, quoteMatch.index).trim();
      if (chunk) {
        chunks.push(chunk);
      }
      chunkStart = quoteMatch.index;
      dialogueCount = 0;
    }

    dialogueCount += 1;
  }

  const finalChunk = sentence.slice(chunkStart).trim();
  if (finalChunk) {
    chunks.push(finalChunk);
  }

  return chunks;
}

export function splitLongParagraphText(
  text: string,
  options: Partial<ParagraphSplitOptions> = {}
): string[] {
  const settings = { ...DEFAULT_OPTIONS, ...options };
  const sentences = splitSentences(text).flatMap((sentence) =>
    splitDialogueDenseSentence(sentence, settings.maxDialoguesPerParagraph)
  );
  const exceedsDialogueLimit =
    countDialogueSpans(text) > settings.maxDialoguesPerParagraph;
  const exceedsLengthLimit =
    sentences.length > settings.maxSentencesPerParagraph ||
    countWords(text) >= settings.longParagraphWordThreshold;

  if (!exceedsLengthLimit && !exceedsDialogueLimit) {
    return [text];
  }

  const paragraphs: string[] = [];
  let current: string[] = [];
  let currentDialogues = 0;
  let currentWords = 0;

  for (const sentence of sentences) {
    const sentenceDialogues = countDialogueSpans(sentence);
    const sentenceWords = countWords(sentence);
    const wouldExceedDialogueLimit =
      current.length > 0 &&
      currentDialogues + sentenceDialogues > settings.maxDialoguesPerParagraph;
    const wouldExceedSentenceLimit =
      current.length >= settings.maxSentencesPerParagraph;
    const wouldExceedWordTarget =
      current.length > 0 &&
      currentWords + sentenceWords > settings.targetWordsPerParagraph;

    if (
      wouldExceedDialogueLimit ||
      wouldExceedSentenceLimit ||
      wouldExceedWordTarget
    ) {
      paragraphs.push(current.join(" "));
      current = [];
      currentDialogues = 0;
      currentWords = 0;
    }

    current.push(sentence);
    currentDialogues += sentenceDialogues;
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
