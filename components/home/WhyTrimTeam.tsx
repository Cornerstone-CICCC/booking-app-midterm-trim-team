import FeatureCard from "./FeatureCard";

const FEATURES = [
  {
    icon: "💵",
    title: "Transparent pricing",
    body: "Clear rates based on lawn size. No haggling, no surprises.",
  },
  {
    icon: "🚛",
    title: "Local crews",
    body: "Trusted teams serving 19 cities across Metro Vancouver.",
  },
  {
    icon: "⚡",
    title: "Easy online booking",
    body: "Book your service online in under two minutes.",
  },
  {
    icon: "✅",
    title: "Satisfaction guaranteed",
    body: "Not happy with the result? We'll come back and make it right.",
  },
];

export default function WhyTrimTeam() {
  return (
    <section>
      <h2 className="text-center text-2xl font-bold text-gray-900">Why Trim Team</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}
