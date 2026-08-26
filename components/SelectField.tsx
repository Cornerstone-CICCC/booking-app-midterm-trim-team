import { type City } from "@/lib/types";

type Props = {
  label: string;
  name: string;
  value: City;
  onChange: (value: City) => void;
  options: readonly string[];
};

export default function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}: Props) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value as City)}
        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
