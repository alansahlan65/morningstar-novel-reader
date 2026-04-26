type SegmentedOption<T extends string> = {
  value: T;
  label: string;
};

type SegmentedControlProps<T extends string> = {
  label: string;
  showLabel?: boolean;
  value: T;
  options: SegmentedOption<T>[];
  onChange: (value: T) => void;
};

export function SegmentedControl<T extends string>({
  label,
  showLabel = true,
  value,
  options,
  onChange
}: SegmentedControlProps<T>) {
  return (
    <div aria-label={label} className="segmented-control" role="group">
      {showLabel ? <span className="segmented-control__label">{label}</span> : null}
      <div className="segmented-control__options">
        {options.map((option) => (
          <button
            aria-pressed={option.value === value}
            className="segmented-control__button"
            key={option.value}
            onClick={() => onChange(option.value)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
