type Option<T extends string> = { value: T; label: string; hint?: string };

type Props<T extends string> = {
  label: string;
  name: string;
  value: T;
  onChange: (value: T) => void;
  options: readonly Option<T>[];
  /** Values that cannot be selected (e.g. already booked slots). */
  disabledValues?: ReadonlySet<T>;
  disabledLabel?: string;
};

export default function RadioCardGroup<T extends string>({
  label,
  name,
  value,
  onChange,
  options,
  disabledValues,
  disabledLabel = "Unavailable",
}: Props<T>) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="grid grid-cols-1 gap-2">
        {options.map((option) => {
          const selected = value === option.value;
          const isDisabled = disabledValues?.has(option.value) ?? false;

          return (
            <label
              key={option.value}
              className={`flex items-center justify-between p-2.5 border rounded-lg transition-all ${
                isDisabled
                  ? "bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed"
                  : selected
                    ? "border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600 cursor-pointer"
                    : "border-gray-200 hover:border-gray-300 cursor-pointer"
              }`}
            >
              <div className={`flex ${option.hint ? "items-start" : "items-center"}`}>
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={selected}
                  disabled={isDisabled}
                  onChange={() => onChange(option.value)}
                  className={`${option.hint ? "mt-1 " : ""}text-emerald-600 focus:ring-emerald-500`}
                />
                <div className="ml-3">
                  <span className="block text-sm font-medium text-gray-900">{option.label}</span>
                  {option.hint && (
                    <span className="block text-xs text-gray-500">{option.hint}</span>
                  )}
                </div>
              </div>

              {isDisabled && (
                <span className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-1 rounded-md">
                  {disabledLabel}
                </span>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
}
