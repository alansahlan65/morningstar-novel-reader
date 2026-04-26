import { uiCopy } from "../content/uiCopy";
import { Button } from "./Button";
import { ProgressBar } from "./ProgressBar";

type ContinueReadingCardProps = {
  chapterTitle: string;
  hasProgress: boolean;
  partTitle: string;
  progressPercent: number;
  onContinue: () => void;
};

export function ContinueReadingCard({
  chapterTitle,
  hasProgress,
  partTitle,
  progressPercent,
  onContinue
}: ContinueReadingCardProps) {
  return (
    <section className="continue-card" aria-labelledby="continue-heading">
      <div className="continue-card__copy">
        <p className="continue-card__status">
          {hasProgress ? uiCopy.restored : uiCopy.noProgress}
        </p>
        <h2 id="continue-heading">{partTitle}</h2>
        <p>{chapterTitle}</p>
      </div>
      <div className="continue-card__meta">
        <span>{Math.round(progressPercent)}%</span>
        <ProgressBar value={progressPercent} />
      </div>
      <Button onClick={onContinue} type="button">
        {hasProgress ? uiCopy.continueReading : uiCopy.startReading}
      </Button>
    </section>
  );
}
