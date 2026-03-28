import { PenLine, Sliders, Zap, Download } from "lucide-react";

const steps = [
  {
    icon: <PenLine size={24} />,
    number: "01",
    title: "Enter your topic",
    description: "Type anything: a new listing, open house, market update, buyer tip, or neighborhood spotlight.",
    gradient: "from-blue-500 to-blue-600",
    glow: "shadow-[0_8px_24px_-4px_rgb(37_99_235/.35)]",
  },
  {
    icon: <Sliders size={24} />,
    number: "02",
    title: "Choose tone & platforms",
    description: "Pick from professional, casual, luxury, and more. Select Instagram, Facebook, LinkedIn, or TikTok.",
    gradient: "from-violet-500 to-violet-600",
    glow: "shadow-[0_8px_24px_-4px_rgb(124_58_237/.35)]",
  },
  {
    icon: <Zap size={24} />,
    number: "03",
    title: "Generate in seconds",
    description: "Hit Generate and get a full content pack: captions, hooks, titles, hashtags, CTAs, and a 7-day plan.",
    gradient: "from-cyan-500 to-blue-500",
    glow: "shadow-[0_8px_24px_-4px_rgb(6_182_212/.35)]",
  },
  {
    icon: <Download size={24} />,
    number: "04",
    title: "Copy and post",
    description: "Copy any piece with one click. Save favorites. Export everything. Start over any time.",
    gradient: "from-blue-600 to-violet-600",
    glow: "shadow-[0_8px_24px_-4px_rgb(37_99_235/.35)]",
  },
];

export default function HowItWorks() {
  return (
    <section className="mesh-light py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <span className="section-label">How It Works</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Four steps to a full content week
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto text-lg">
            No marketing degree required. Just tell us what you want to post about.
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="relative group card-3d rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[var(--shadow-sm)]"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-2.5 w-5 h-px bg-gradient-to-r from-slate-300 to-transparent z-10" />
              )}

              <div className="mb-5 flex items-start justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} text-white ${step.glow}`}>
                  {step.icon}
                </div>
                <span className="text-4xl font-black text-slate-100 leading-none">
                  {step.number}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>

              {/* Hover gradient overlay */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity pointer-events-none`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
