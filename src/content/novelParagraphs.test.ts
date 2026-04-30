import { describe, expect, it } from "vitest";
import { countDialogueSpans } from "../utils/paragraphSplitting";
import { novelParts } from "./novel";

describe("rendered novel paragraphs", () => {
  it("keeps displayed paragraphs to at most two dialogue spans", () => {
    const dialogueDenseParagraphs = novelParts.flatMap((part) =>
      part.chapters.flatMap((chapter) =>
        chapter.blocks
          .filter((block) => block.type === "paragraph")
          .filter((block) => countDialogueSpans(block.text) > 2)
          .map((block) => ({
            part: part.title,
            chapter: chapter.title,
            dialogueSpans: countDialogueSpans(block.text),
            text: block.text
          }))
      )
    );

    expect(dialogueDenseParagraphs).toEqual([]);
  });
});
