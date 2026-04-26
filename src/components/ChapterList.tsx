import type { NovelPart } from "../types/novel";
import { getChapterStatus } from "../utils/progress";
import type { ProgressMap } from "../utils/storage";

type ChapterListProps = {
  part: NovelPart;
  progressMap: ProgressMap;
  onReadChapter: (chapterId: string) => void;
};

export function ChapterList({
  part,
  progressMap,
  onReadChapter
}: ChapterListProps) {
  return (
    <section className="chapter-list" aria-labelledby="chapter-list-heading">
      <div className="section-heading">
        <h2 id="chapter-list-heading">Chapters</h2>
        <span>{part.chapters.length} chapters</span>
      </div>
      <div className="chapter-list__rows">
        {part.chapters.map((chapter) => (
          <button
            className="chapter-row"
            key={chapter.id}
            onClick={() => onReadChapter(chapter.id)}
            type="button"
          >
            <span>
              <strong>{chapter.title}</strong>
              <small>{chapter.estimatedMinutes} min read</small>
            </span>
            <em>{getChapterStatus(progressMap, part.id, chapter.id)}</em>
          </button>
        ))}
      </div>
    </section>
  );
}
