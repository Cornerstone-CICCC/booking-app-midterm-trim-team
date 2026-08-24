// A text input with label + hint + error message
// inputProps allows passing more props to the <input> element.

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
};

export default function Field({ label, error, hint, ...inputProps }: Props) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1" htmlFor={inputProps.name}>
        {label}
      </label>
      <input
        id={inputProps.name}
        className="w-full border border-gray-300 rounded px-3 py-2"
        {...inputProps}
      />
      {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}
