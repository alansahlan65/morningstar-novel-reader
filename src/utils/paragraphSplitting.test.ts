import { describe, expect, it } from "vitest";
import type { NovelBlock } from "../types/novel";
import {
  countDialogueSpans,
  splitLongParagraphBlocks,
  splitLongParagraphText
} from "./paragraphSplitting";

describe("splitLongParagraphText", () => {
  it("keeps short literary paragraphs unchanged", () => {
    const paragraph =
      "Jack glanced toward the mill. The river moved behind it with patient hunger.";

    expect(splitLongParagraphText(paragraph)).toEqual([paragraph]);
  });

  it("splits long paragraphs at sentence boundaries while preserving exact text", () => {
    const paragraph = [
      "The road had taken on the shape of a habit, which was its own kind of cruelty.",
      "Buck’s hooves found the ruts before Jack fully set the horse into them.",
      "The wolf medallion at his throat had gone warm under the weight of his shirt.",
      "Four years on the Path had taught him that a road could lie the way a man did.",
      "Repetition only made the lie expensive."
    ].join(" ");

    const result = splitLongParagraphText(paragraph, {
      maxSentencesPerParagraph: 2,
      longParagraphWordThreshold: 10,
      targetWordsPerParagraph: 80
    });

    expect(result).toEqual([
      [
        "The road had taken on the shape of a habit, which was its own kind of cruelty.",
        "Buck’s hooves found the ruts before Jack fully set the horse into them."
      ].join(" "),
      [
        "The wolf medallion at his throat had gone warm under the weight of his shirt.",
        "Four years on the Path had taught him that a road could lie the way a man did."
      ].join(" "),
      "Repetition only made the lie expensive."
    ]);
    expect(result.join(" ")).toBe(paragraph);
  });

  it("splits paragraphs with more than two dialogue spans", () => {
    const paragraph = [
      "“First,” Jack said.",
      "“Second.”",
      "The room waited.",
      "“Third.”",
      "“Fourth.”",
      "He looked away.",
      "“Fifth.”"
    ].join(" ");

    const result = splitLongParagraphText(paragraph, {
      maxDialoguesPerParagraph: 2,
      maxSentencesPerParagraph: 8,
      longParagraphWordThreshold: 999,
      targetWordsPerParagraph: 999
    });

    expect(result).toEqual([
      "“First,” Jack said. “Second.” The room waited.",
      "“Third.” “Fourth.” He looked away.",
      "“Fifth.”"
    ]);
    expect(result.every((item) => countDialogueSpans(item) <= 2)).toBe(true);
    expect(result.join(" ")).toBe(paragraph);
  });

  it("splits dialogue-dense single sentences at quote boundaries when needed", () => {
    const paragraph =
      "“First,” he said, “second,” then finally, “third,” before the door closed.";

    const result = splitLongParagraphText(paragraph, {
      maxDialoguesPerParagraph: 2,
      maxSentencesPerParagraph: 8,
      longParagraphWordThreshold: 999,
      targetWordsPerParagraph: 999
    });

    expect(result).toEqual([
      "“First,” he said, “second,” then finally,",
      "“third,” before the door closed."
    ]);
    expect(result.every((item) => countDialogueSpans(item) <= 2)).toBe(true);
    expect(result.join(" ")).toBe(paragraph);
  });
});

describe("splitLongParagraphBlocks", () => {
  it("splits only paragraph blocks and leaves structural blocks alone", () => {
    const blocks: NovelBlock[] = [
      { type: "chapter-title", title: "THE GROUND THAT REMEMBERS" },
      {
        type: "paragraph",
        text: [
          "The first sentence is here.",
          "The second sentence is here.",
          "The third sentence is here."
        ].join(" ")
      },
      { type: "section-break" }
    ];

    expect(
      splitLongParagraphBlocks(blocks, {
        maxSentencesPerParagraph: 1,
        longParagraphWordThreshold: 3,
        targetWordsPerParagraph: 80
      })
    ).toEqual([
      { type: "chapter-title", title: "THE GROUND THAT REMEMBERS" },
      { type: "paragraph", text: "The first sentence is here." },
      { type: "paragraph", text: "The second sentence is here." },
      { type: "paragraph", text: "The third sentence is here." },
      { type: "section-break" }
    ]);
  });
});
