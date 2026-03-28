import Link from "next/link";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const freeTier = [
  "5 content packs per month",
  "All 6 tone options",
  "All 4 platforms",
  "7-day posting plan",
  "Copy any content",
  "Save favorites locally",
];

const proTier = [
  "Unlimited content packs",
  "All free tier features",
  "Priority generation speed",
  "Advanced tone fine-tuning",
  "Export to PDF / text file",
  "Up to 3 saved niches",
  "Email support",
];

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-16 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-3">
              Pricing
            </p>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Simple, honest pricing
            </h1>
            <p className="text-slate-500 max-w-xl mx-auto text-lg">
              Start free. Upgrade when it saves you more time than it costs.
            </p>
          </div>

          {/* Plans */}
          <div className="grid sm:grid-cols-2 gap-6 mb-14">
            {/* Free */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)]">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900">Free</h2>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900">$0</span>
                  <span className="text-slate-400">forever</span>
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  Perfect for trying it out.
                </p>
              </div>
              <ul className="space-y-3 mb-8">
                {freeTier.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <Check size={16} className="mt-0.5 shrink-0 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/generate"
                className="block text-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Start Free
              </Link>
            </div>

            {/* Pro */}
            <div className="relative rounded-2xl border-2 border-brand-500 bg-white p-8 shadow-[0_4px_16px_0_rgb(14_134_232/0.12)]">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1 rounded-full bg-brand-600 px-4 py-1 text-xs font-bold text-white">
                  <Sparkles size={11} />
                  Most Popular
                </span>
              </div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900">Pro</h2>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900">$29</span>
                  <span className="text-slate-400">/ month</span>
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  For agents who post consistently.
                </p>
              </div>
              <ul className="space-y-3 mb-8">
                {proTier.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <Check size={16} className="mt-0.5 shrink-0 text-brand-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/generate"
                className="group flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
              >
                Get Started
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* FAQ */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)]">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Common questions</h2>
            <div className="space-y-5">
              {[
                {
                  q: "Do I need a credit card to start?",
                  a: "No. The free tier is completely free with no credit card required.",
                },
                {
                  q: "Will the content sound like me?",
                  a: "Yes — choose a tone that matches your style. The content is generated specifically for realtors, so it will feel on-brand, not generic.",
                },
                {
                  q: "Can I cancel anytime?",
                  a: "Absolutely. No contracts, no commitments. Cancel from your account settings in seconds.",
                },
                {
                  q: "What if I have multiple agents on my team?",
                  a: "Team pricing is coming soon. Join the waitlist and we'll notify you when it's available.",
                },
              ].map(({ q, a }) => (
                <div key={q}>
                  <h3 className="text-sm font-semibold text-slate-800 mb-1">{q}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
