import { describe, expect, it } from "vitest";
import { parseManuscriptText } from "./parseManuscript";

describe("parseManuscriptText", () => {
  it("turns manuscript headings, section breaks, and paragraphs into blocks", () => {
    const parsed = parseManuscriptText(
      [
        "PART I",
        "BACK ON THE PATH",
        "The roads remember what people deny.",
        "THE GROUND THAT REMEMBERS",
        "The first paragraph stays exact.",
        "*   *   *",
        "The second paragraph also stays exact.",
        "BLACK INK, WHITE PAPER",
        "A new chapter begins here."
      ].join("\n\n")
    );

    expect(parsed.number).toBe("PART I");
    expect(parsed.title).toBe("BACK ON THE PATH");
    expect(parsed.thematicLine).toBe("The roads remember what people deny.");
    expect(parsed.chapters).toHaveLength(2);
    expect(parsed.chapters[0]).toEqual({
      id: "the-ground-that-remembers",
      title: "THE GROUND THAT REMEMBERS",
      blocks: [
        { type: "chapter-title", title: "THE GROUND THAT REMEMBERS" },
        { type: "paragraph", text: "The first paragraph stays exact." },
        { type: "section-break" },
        { type: "paragraph", text: "The second paragraph also stays exact." }
      ]
    });
  });
});
