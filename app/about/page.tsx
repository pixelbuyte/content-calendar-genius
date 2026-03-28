import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-16 px-4 sm:px-6">
        <div className="mx-auto max-w-2xl">
          {/* Hero */}
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-3">
              About
            </p>
            <h1 className="text-4xl font-bold text-slate-900 mb-6">
              Made for realtors who hate staring at blank screens.
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Content Calendar Genius was built for one reason: real estate agents spend too much
              time trying to figure out what to post. The best agents are great at selling homes —
              not at writing Instagram captions.
            </p>
          </div>

          {/* Story */}
          <div className="prose prose-slate max-w-none space-y-5 mb-12">
            <p className="text-slate-600 leading-relaxed">
              We watched agents spend 30–45 minutes crafting a single post — rewriting captions,
              second-guessing hooks, abandoning the whole thing because it didn&apos;t feel right.
              Meanwhile, their competitors were consistently showing up in feeds because they had a
              system.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Content Calendar Genius is that system. Type what you want to talk about — a new
              listing, an open house, a market tip — and get a full week&apos;s worth of content
              in under 30 seconds. Captions ready to paste. Hashtags already included. A plan that
              tells you what to post on which day.
            </p>
            <p className="text-slate-600 leading-relaxed">
              No bloat. No subscriptions you forget about. No learning curve. Just type, generate,
              copy, post.
            </p>
          </div>

          {/* Values */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 mb-12 shadow-[0_1px_3px_0_rgb(0_0_0/0.06)]">
            <h2 className="text-lg font-bold text-slate-900 mb-6">What we believe</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Simple beats powerful",
                  body: "A tool you use every day beats a tool that does everything. We cut every feature that slows you down.",
                },
                {
                  title: "Real content beats generic AI",
                  body: "We've tuned every prompt for real estate specifically. The output sounds like a top-producing agent — not a chatbot.",
                },
                {
                  title: "Your time is money",
                  body: "Every minute you spend writing captions is a minute you're not on the phone with a client. We're here to give you that time back.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100">
                    <Sparkles size={12} className="text-brand-600" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
                    <p className="mt-0.5 text-sm text-slate-500">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/generate"
              className="group inline-flex items-center gap-2 rounded-xl bg-brand-600 px-7 py-3.5 text-base font-semibold text-white hover:bg-brand-700 transition-colors"
            >
              Try It Free
              <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <p className="mt-4 text-sm text-slate-400">
              No sign-up required to generate your first pack.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
