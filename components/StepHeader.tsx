// The "Step X of 3" heading block shown at the top of every booking step.

type Props = {
  step: number;
  total?: number;
  title: string;
  subtitle: string;
};

export default function StepHeader({ step, total = 3, title, subtitle }: Props) {
  return (
    <div className="mb-4">
      <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
        Step {step} of {total}
      </span>
      <h1 className="text-2xl font-bold text-gray-900 mt-1">{title}</h1>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}
