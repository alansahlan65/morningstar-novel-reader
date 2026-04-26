type ProgressBarProps = {
  value: number;
  label?: string;
};

export function ProgressBar({ value, label = "Reading progress" }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      aria-label={label}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={Math.round(clamped)}
      className="progress-bar"
      role="progressbar"
    >
      <span style={{ transform: `scaleX(${clamped / 100})` }} />
    </div>
  );
}
