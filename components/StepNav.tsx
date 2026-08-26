type Props = {
  onBack?: () => void;
  nextLabel?: string;
};

export default function StepNav({ onBack, nextLabel = "Next Step →" }: Props) {
  return (
    <div className={`pt-2 flex ${onBack ? "justify-between" : "justify-end"}`}>
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
        >
          ← Back
        </button>
      )}
      <button
        type="submit"
        className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
      >
        {nextLabel}
      </button>
    </div>
  );
}
