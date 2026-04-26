import { uiCopy } from "../content/uiCopy";
import { Button } from "../components/Button";
import { ChapterList } from "../components/ChapterList";
import { CoverPlaceholder } from "../components/CoverPlaceholder";
import { Layout } from "../components/Layout";
import { ProgressBar } from "../components/ProgressBar";
import { TopBar } from "../components/TopBar";
import type { NovelPart } from "../types/novel";
import {
  getLatestProgressForPart,
  getPartProgressPercent
} from "../utils/progress";
import type { ProgressMap } from "../utils/storage";
import { getTotalEstimatedMinutes } from "../content/novel";

type PartDetailProps = {
  part: NovelPart;
  progressMap: ProgressMap;
  onBack: () => void;
  onOpenSettings: () => void;
  onReadChapter: (chapterId: string) => void;
};

export function PartDetail({
  part,
  progressMap,
  onBack,
  onOpenSettings,
  onReadChapter
}: PartDetailProps) {
  const progressPercent = getPartProgressPercent(part, progressMap);
  const latest = getLatestProgressForPart(part, progressMap);
  const ctaLabel = latest ? uiCopy.continueReading : uiCopy.startReading;
  const targetChapterId = latest?.chapterId ?? part.chapters[0].id;

  return (
    <Layout>
      <TopBar
        eyebrow={part.number}
        onBack={onBack}
        onSettings={onOpenSettings}
        title="Part Detail"
      />
      <main className="page page--part-detail">
        <section className="part-hero">
          <CoverPlaceholder
            large
            number={part.number}
            title={part.title}
            tone={part.coverTone}
          />
          <div className="part-hero__copy">
            <p className="eyebrow">{part.number}</p>
            <h1>{part.title}</h1>
            <p className="part-hero__line">{part.thematicLine}</p>
            <p>{part.subtitle}</p>
            <div className="part-hero__progress">
              <span>{Math.round(progressPercent)}% complete</span>
              <ProgressBar value={progressPercent} />
            </div>
            <div className="part-hero__actions">
              <Button onClick={() => onReadChapter(targetChapterId)} type="button">
                {ctaLabel}
              </Button>
              <span>{getTotalEstimatedMinutes(part)} min total</span>
            </div>
          </div>
        </section>
        <ChapterList
          onReadChapter={onReadChapter}
          part={part}
          progressMap={progressMap}
        />
      </main>
    </Layout>
  );
}
