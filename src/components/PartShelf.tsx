import type { NovelPart } from "../types/novel";
import { getPartProgressPercent, getPartStatus } from "../utils/progress";
import type { ProgressMap } from "../utils/storage";
import { PartCard } from "./PartCard";

type PartShelfProps = {
  parts: NovelPart[];
  progressMap: ProgressMap;
  onOpenPart: (partId: string) => void;
};

export function PartShelf({ parts, progressMap, onOpenPart }: PartShelfProps) {
  return (
    <section className="shelf" aria-labelledby="parts-heading">
      <div className="section-heading">
        <h2 id="parts-heading">Parts</h2>
        <span>{parts.length} volumes</span>
      </div>
      <div className="shelf__rail">
        {parts.map((part) => (
          <PartCard
            key={part.id}
            onOpen={() => onOpenPart(part.id)}
            part={part}
            progressPercent={getPartProgressPercent(part, progressMap)}
            status={getPartStatus(part, progressMap)}
          />
        ))}
      </div>
    </section>
  );
}
