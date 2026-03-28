import Link from "next/link";
import {
  FileText, Hash, Calendar, Mic2, Heart, Smartphone,
  ArrowRight, Sparkles, Download, RefreshCw,
} from "lucide-react";

const features = [
  {
    icon: <FileText size={20} />,
    title: "Short & Long Captions",
    description: "A punchy 1-liner and a full story-driven caption for every topic — ready to paste.",
    gradient: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: <Mic2 size={20} />,
    title: "3 Hook & Title Ideas",
    description: "Scroll-stopping opening lines and headline ideas that make people stop and read.",
    gradient: "from-violet-500 to-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
  {
    icon: <Calendar size={20} />,
    title: "7-Day Posting Plan",
    description: "A full week of post ideas mapped to specific days and platforms. No planning needed.",
    gradient: "from-cyan-500 to-blue-500",
    bg: "bg-cyan-50",
    border: "border-cyan-100",
  },
  {
    icon: <Hash size={20} />,
    title: "Hashtag Sets",
    description: "Niche-specific, platform-aware hashtags generated with every single content pack.",
    gradient: "from-blue-600 to-violet-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: <Heart size={20} />,
    title: "Save Favorites",
    description: "Star any caption, hook, or title you love. Saved instantly in your browser.",
    gradient: "from-pink-500 to-rose-500",
    bg: "bg-rose-50",
    border: "border-rose-100",
  },
  {
    icon: <Download size={20} />,
    title: "Export Your Pack",
    description: "Download the full content pack as a text file to share with your team or VA.",
    gradient: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    icon: <RefreshCw size={20} />,
    title: "Quick Actions",
    description: "Make it shorter, make it punchier, or regenerate any single section on its own.",
    gradient: "from-orange-500 to-amber-500",
    bg: "bg-orange-50",
    border: "border-orange-100",
  },
  {
    icon: <Smartphone size={20} />,
    title: "Mobile-Ready",
    description: "Use it on your phone between showings or on your laptop between calls. Works beautifully either way.",
    gradient: "from-slate-600 to-slate-700",
    bg: "bg-slate-50",
    border: "border-slate-200",
  },
];

const exampleTopics = [
  "New listing in Riverside Heights",
  "Open house this Saturday at 2pm",
  "5 mistakes first-time buyers make",
  "What's happening in the local market?",
  "Just sold over asking price!",
  "Why now is a great time to sell",
  "First-time homebuyer guide",
  "Neighborhood spotlight: Downtown",
];

export default function Features() {
  return (
    <>
      {/* Features grid */}
      <section className="bg-white py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="section-label">What You Get</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Everything a realtor needs to post confidently
            </h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto">
              One generation gives you everything below — instantly.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className={`group relative rounded-2xl border ${feature.border} ${feature.bg} p-5 hover:shadow-[var(--shadow-md)] transition-all hover:-translate-y-0.5`}
              >
                <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-[0_4px_12px_-2px_rgb(0_0_0/.2)]`}>
                  {feature.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example topics + CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-24 px-4 sm:px-6">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="orb w-[350px] h-[350px] bg-blue-600/20 top-0 left-0 blur-[80px]" />
          <div className="orb w-[300px] h-[300px] bg-violet-600/15 bottom-0 right-0 blur-[80px]" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="section-label" style={{ WebkitTextFillColor: "rgb(147 197 253)" }}>Try These Topics</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight">
            Just type what&apos;s on your mind
          </h2>
          <p className="text-slate-400 mb-10 text-lg">
            These are real prompts realtors use every day. You type it, we make it post-ready.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {exampleTopics.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-2 text-sm text-slate-300 hover:border-blue-400/40 hover:bg-white/10 hover:text-white transition-all cursor-default"
              >
                {topic}
              </span>
            ))}
          </div>

          <Link
            href="/generate"
            className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-4 text-base font-bold text-white shadow-[var(--shadow-brand)] hover:shadow-[0_12px_32px_-4px_rgb(37_99_235/.5)] hover:-translate-y-0.5 transition-all"
          >
            <Sparkles size={18} />
            Start Generating Free
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="mt-4 text-sm text-slate-500">No sign-up required · Uses AI tuned for real estate</p>
        </div>
      </section>
    </>
  );
}
