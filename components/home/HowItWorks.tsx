import StepCard from "./StepCard";

const STEPS = [
  {
    icon: "📍",
    title: "Tell us about your lawn",
    body: "Your city, address, and lawn size — that's all we need to start.",
  },
  {
    icon: "📅",
    title: "Pick a date & time",
    body: "Choose the day and the time slot that works best for you.",
  },
  {
    icon: "🌱",
    title: "We mow, you relax",
    body: "Our local crew takes care of the rest. Sit back and enjoy a fresh lawn.",
  },
];

export default function HowItWorks() {
  return (
    <section>
      <h2 className="text-center text-2xl font-bold text-gray-900">How it works</h2>
      <p className="mt-2 text-center text-gray-500">Three simple steps to a fresh lawn.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <StepCard key={step.title} step={i + 1} {...step} />
        ))}
      </div>
    </section>
  );
}
