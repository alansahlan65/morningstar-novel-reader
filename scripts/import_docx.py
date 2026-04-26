from __future__ import annotations

import json
import re
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "src" / "content" / "novel.generated.ts"
DOCX_FILES = [
    Path(r"C:\Users\Asus\Downloads\Part1_revised.docx"),
    Path(r"C:\Users\Asus\Downloads\Part2_revised.docx"),
    Path(r"C:\Users\Asus\Downloads\Part3_revised.docx"),
    Path(r"C:\Users\Asus\Downloads\Part4_revised.docx"),
    Path(r"C:\Users\Asus\Downloads\Part5_revised.docx"),
    Path(r"C:\Users\Asus\Downloads\Part6_revised.docx"),
]

NS = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
CHAPTER_TITLE_RE = re.compile(r"^[A-Z0-9IVXLCDM ,'.:;!?-]+$")
SECTION_BREAK_RE = re.compile(r"^\*\s+\*\s+\*$")


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower())
    return slug.strip("-")


def paragraph_text(paragraph: ET.Element) -> str:
    parts: list[str] = []
    for node in paragraph.iter():
        if node.tag == f"{{{NS['w']}}}t" and node.text:
            parts.append(node.text)
        elif node.tag == f"{{{NS['w']}}}tab":
            parts.append("\t")
        elif node.tag == f"{{{NS['w']}}}br":
            parts.append("\n")
    return "".join(parts).strip()


def read_docx_paragraphs(path: Path) -> list[str]:
    if not path.exists():
        raise FileNotFoundError(f"Missing manuscript file: {path}")

    with zipfile.ZipFile(path) as docx:
        document = ET.fromstring(docx.read("word/document.xml"))

    body = document.find("w:body", NS)
    if body is None:
        return []

    paragraphs = []
    for child in body:
        if child.tag != f"{{{NS['w']}}}p":
            continue
        text = paragraph_text(child)
        if text:
            paragraphs.append(text)
    return paragraphs


def is_chapter_title(value: str) -> bool:
    return (
        0 < len(value) <= 90
        and bool(re.search(r"[A-Z]", value))
        and bool(CHAPTER_TITLE_RE.match(value))
    )


def word_count(blocks: list[dict[str, str]]) -> int:
    total = 0
    for block in blocks:
        if block["type"] == "paragraph":
            total += len(re.findall(r"\S+", block["text"]))
    return total


def build_part(path: Path, index: int) -> dict:
    paragraphs = read_docx_paragraphs(path)
    if len(paragraphs) < 4:
        raise ValueError(f"Expected part title, thematic line, and chapters in {path}")

    number, title, thematic_line = paragraphs[:3]
    part = {
        "id": f"part-{index}",
        "number": number,
        "title": title,
        "thematicLine": thematic_line,
        "chapters": [],
    }

    current_chapter: dict | None = None

    for line in paragraphs[3:]:
        if is_chapter_title(line):
            current_chapter = {
                "id": slugify(line),
                "title": line,
                "estimatedMinutes": 1,
                "blocks": [{"type": "chapter-title", "title": line}],
            }
            if not part["chapters"]:
                current_chapter["blocks"].insert(
                    0,
                    {
                        "type": "part-title",
                        "number": number,
                        "title": title,
                        "thematicLine": thematic_line,
                    },
                )
            part["chapters"].append(current_chapter)
            continue

        if current_chapter is None:
            continue

        if SECTION_BREAK_RE.match(line):
            current_chapter["blocks"].append({"type": "section-break"})
        else:
            current_chapter["blocks"].append({"type": "paragraph", "text": line})

    for chapter in part["chapters"]:
        chapter["estimatedMinutes"] = max(1, round(word_count(chapter["blocks"]) / 230))

    return part


def main() -> None:
    parts = [build_part(path, index + 1) for index, path in enumerate(DOCX_FILES)]
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    serialized = json.dumps(parts, ensure_ascii=False, indent=2)
    OUTPUT.write_text(
        "\n".join(
            [
                "import type { NovelBlock } from \"../types/novel\";",
                "",
                "export type GeneratedNovelChapter = {",
                "  id: string;",
                "  title: string;",
                "  estimatedMinutes: number;",
                "  blocks: NovelBlock[];",
                "};",
                "",
                "export type GeneratedNovelPart = {",
                "  id: string;",
                "  number: string;",
                "  title: string;",
                "  thematicLine: string;",
                "  chapters: GeneratedNovelChapter[];",
                "};",
                "",
                f"export const generatedNovelParts = {serialized} satisfies GeneratedNovelPart[];",
                "",
            ]
        ),
        encoding="utf-8",
    )
    chapter_count = sum(len(part["chapters"]) for part in parts)
    print(f"Generated {len(parts)} parts and {chapter_count} chapters at {OUTPUT}")


if __name__ == "__main__":
    main()
