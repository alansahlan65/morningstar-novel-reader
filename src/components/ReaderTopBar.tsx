import { getChapterPosition, totalChapterCount } from "../content/novel";
import type { NovelChapter, NovelPart } from "../types/novel";
import { IconButton } from "./Button";
import { BackIcon } from "./icons";
import { ProgressBar } from "./ProgressBar";

type ReaderTopBarProps = {
  chapter: NovelChapter;
  part: NovelPart;
  progressPercent: number;
  onBack: () => void;
};

export function ReaderTopBar({
  chapter,
  part,
  progressPercent,
  onBack
}: ReaderTopBarProps) {
  return (
    <header className="reader-top-bar">
      <IconButton label="Back to part" onClick={onBack} type="button">
        <BackIcon />
      </IconButton>
      <div className="reader-top-bar__label">
        <span>{part.number}</span>
        <strong>{chapter.title}</strong>
      </div>
      <span className="reader-top-bar__count">
        {getChapterPosition(part.id, chapter.id)} / {totalChapterCount}
      </span>
      <ProgressBar value={progressPercent} />
    </header>
  );
}
