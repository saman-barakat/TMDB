interface Option<T extends string> {
  value: T;
  label: string;
}

interface SegmentedToggleProps<T extends string> {
  label: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
}

export default function SegmentedToggle<T extends string>({
  label,
  options,
  value,
  onChange,
}: SegmentedToggleProps<T>) {
  return (
    <div className="segmented" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`segmented__btn${option.value === value ? " is-active" : ""}`}
          aria-pressed={option.value === value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
