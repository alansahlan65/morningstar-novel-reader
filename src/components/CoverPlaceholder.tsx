import type { CoverTone } from "../types/novel";

type CoverPlaceholderProps = {
  number: string;
  title: string;
  tone: CoverTone;
  large?: boolean;
};

export function CoverPlaceholder({
  number,
  title,
  tone,
  large = false
}: CoverPlaceholderProps) {
  return (
    <div
      aria-label={`${number}: ${title}`}
      className={`cover cover--${tone} ${large ? "cover--large" : ""}`.trim()}
      role="img"
    >
      <div className="cover__rule" />
      <span className="cover__number">{number}</span>
      <span className="cover__mark">M</span>
      <span className="cover__title">{title}</span>
    </div>
  );
}
