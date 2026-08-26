// A labelled text input for the booking steps. Extra props (type, value,
// onChange, placeholder, required…) are spread onto the underlying <input>,
// so the same component covers text / email / tel / date fields.

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export default function TextField({ label, id, name, ...inputProps }: Props) {
  const inputId = id ?? name;
  return (
    <div>
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={inputId}
        name={name}
        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        {...inputProps}
      />
    </div>
  );
}
