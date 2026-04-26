import type { NovelPart } from "../types/novel";
import { CoverPlaceholder } from "./CoverPlaceholder";
import { ProgressBar } from "./ProgressBar";

type PartCardProps = {
  part: NovelPart;
  progressPercent: number;
  status: string;
  onOpen: () => void;
};

export function PartCard({ part, progressPercent, status, onOpen }: PartCardProps) {
  return (
    <button className="part-card" onClick={onOpen} type="button">
      <CoverPlaceholder number={part.number} title={part.title} tone={part.coverTone} />
      <span className="part-card__number">{part.number}</span>
      <strong>{part.title}</strong>
      <span>{part.subtitle}</span>
      <div className="part-card__progress">
        <span>{status}</span>
        <ProgressBar value={progressPercent} />
      </div>
    </button>
  );
}
