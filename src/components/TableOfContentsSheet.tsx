import { novelParts } from "../content/novel";
import type { NovelChapter, NovelPart } from "../types/novel";
import { Sheet } from "./Sheet";

type TableOfContentsSheetProps = {
  currentChapterId: string;
  currentPartId: string;
  open: boolean;
  onClose: () => void;
  onSelectChapter: (part: NovelPart, chapter: NovelChapter) => void;
};

export function TableOfContentsSheet({
  currentChapterId,
  currentPartId,
  open,
  onClose,
  onSelectChapter
}: TableOfContentsSheetProps) {
  return (
    <Sheet
      description="Move to another part or chapter."
      onClose={onClose}
      open={open}
      title="Table of contents"
    >
      <div className="toc-list">
        {novelParts.map((part) => (
          <section className="toc-part" key={part.id}>
            <h3>
              {part.number}
              <span>{part.title}</span>
            </h3>
            <div className="toc-part__chapters">
              {part.chapters.map((chapter) => {
                const isCurrent =
                  currentPartId === part.id && currentChapterId === chapter.id;

                return (
                  <button
                    aria-current={isCurrent ? "page" : undefined}
                    className={isCurrent ? "toc-row toc-row--current" : "toc-row"}
                    key={chapter.id}
                    onClick={() => onSelectChapter(part, chapter)}
                    type="button"
                  >
                    <span>{chapter.title}</span>
                    <small>{chapter.estimatedMinutes} min</small>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </Sheet>
  );
}
