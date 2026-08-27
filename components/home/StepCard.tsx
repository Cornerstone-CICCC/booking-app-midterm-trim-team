export default function StepCard({
  step,
  icon,
  title,
  body,
}: {
  step: number;
  icon: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-2xl">
        {icon}
      </div>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-emerald-600">
        Step {step}
      </p>
      <h3 className="mt-1 font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{body}</p>
    </div>
  );
}
