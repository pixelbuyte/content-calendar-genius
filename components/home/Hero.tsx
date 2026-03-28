"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Copy, Check, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

const floatingCards = [
  {
    label: "Short Caption",
    text: "🏡 Just listed in Maple Grove! This charming 3-bed craftsman won't last long. DM me to schedule your private tour.",
    color: "from-blue-500 to-violet-600",
    rotate: "-rotate-2",
    delay: "0s",
  },
  {
    label: "Hook Idea",
    text: "Most buyers never ask their agent this one question — and it costs them thousands.",
    color: "from-violet-500 to-cyan-500",
    rotate: "rotate-1",
    delay: "1.5s",
  },
  {
    label: "Weekly Plan",
    text: "Mon: Market tip  ·  Wed: New listing  ·  Fri: Open house  ·  Sun: Motivation",
    color: "from-cyan-500 to-blue-600",
    rotate: "rotate-3",
    delay: "0.8s",
  },
];

function TypewriterText() {
  const topics = [
    "Just listed: 3-bed craftsman in Maple Grove",
    "Open house this Saturday at 2pm",
    "5 mistakes first-time buyers make",
    "Just sold $40k over asking price!",
    "Market update: prices are shifting",
  ];
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const topic = topics[index];
    if (typing) {
      if (displayed.length < topic.length) {
        const t = setTimeout(() => setDisplayed(topic.slice(0, displayed.length + 1)), 40);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2200);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 18);
        return () => clearTimeout(t);
      } else {
        setIndex((i) => (i + 1) % topics.length);
        setTyping(true);
      }
    }
  });

  return (
    <span className="text-white/90">
      {displayed}
      <span className="animate-pulse text-brand-400">|</span>
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden mesh-bg min-h-screen flex items-center">
      {/* Animated orbs */}
      <div className="orb orb-1 w-[500px] h-[500px] bg-blue-600/20 -top-32 -left-32" />
      <div className="orb orb-2 w-[400px] h-[400px] bg-violet-600/15 top-20 right-0" />
      <div className="orb orb-1 w-[300px] h-[300px] bg-cyan-500/10 bottom-0 left-1/3" style={{ animationDelay: "4s" }} />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Copy */}
          <div className="max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-blue-300 mb-8 backdrop-blur-sm">
              <Sparkles size={12} />
              Built specifically for Real Estate Agents
            </div>

            <h1 className="text-5xl sm:text-6xl font-black leading-[1.08] tracking-tight">
              <span
                style={{
                  background: "linear-gradient(135deg, #f97316 0%, #ec4899 25%, #a855f7 50%, #3b82f6 75%, #06b6d4 100%)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "gradient-x 3s ease infinite",
                }}
              >
                Turn one idea into a full week of content.
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-400 leading-relaxed">
              Enter a topic, choose a tone, and get captions, hooks, titles,
              hashtags, and a 7-day posting plan — in seconds. No more blank screens.
            </p>

            {/* Live typewriter input mockup */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                What do you want to post about?
              </div>
              <div className="text-sm min-h-[22px]">
                <TypewriterText />
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
              <Link
                href="/generate"
                className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-7 py-4 text-base font-bold text-white shadow-[var(--shadow-brand)] hover:shadow-[0_12px_32px_-4px_rgb(37_99_235/.5)] hover:-translate-y-0.5 transition-all active:scale-[0.98]"
              >
                <Zap size={18} />
                Generate Free
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/pricing"
                className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-base font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-all backdrop-blur-sm"
              >
                View Pricing
              </Link>
            </div>

            {/* Trust pills */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { icon: <Zap size={12} />, text: "Ready in 30 seconds" },
                { icon: <Copy size={12} />, text: "One-click copy" },
                { icon: <Calendar size={12} />, text: "7-day plan included" },
              ].map((p) => (
                <span
                  key={p.text}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-400"
                >
                  <span className="text-blue-400">{p.icon}</span>
                  {p.text}
                </span>
              ))}
            </div>
          </div>

          {/* Right — 3D Floating cards */}
          <div className="hidden lg:block relative h-[520px]">
            {/* Depth glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 rounded-full bg-blue-600/15 blur-3xl" />
            </div>

            {/* Main card — center */}
            <div
              className="absolute top-12 left-8 right-8 glass rounded-3xl p-6 shadow-[var(--shadow-3d)] float-slow"
              style={{ transformStyle: "preserve-3d", transform: "perspective(1200px) rotateY(-8deg) rotateX(3deg)" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                <span className="ml-1 text-xs text-slate-500 font-medium">Content Calendar Genius</span>
              </div>

              <div className="space-y-3">
                <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-2.5">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Topic</div>
                  <div className="text-sm text-slate-700">Just listed: 3-bed craftsman in Maple Grove</div>
                </div>

                <div className="flex gap-2">
                  {["Professional", "Instagram"].map((t) => (
                    <span key={t} className="rounded-full bg-blue-100 border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-700">{t}</span>
                  ))}
                </div>

                <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-violet-50 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">Short Caption</span>
                    <span className="flex items-center gap-1 rounded-lg bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                      <Check size={10} /> Copied!
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    🏡 Just listed in Maple Grove! This charming 3-bed craftsman won&apos;t last long. Hardwood floors, updated kitchen, backyard made for entertaining. DM me for a private tour.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {["Hook Ideas", "7-Day Plan", "Hashtags", "CTAs"].map((s) => (
                    <div key={s} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-semibold text-slate-500 text-center">
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating chip — hooks */}
            <div
              className="absolute -top-2 -right-4 glass rounded-2xl p-4 shadow-[var(--shadow-lg)] float"
              style={{ transform: "perspective(800px) rotateY(-10deg) rotateX(-4deg)", animationDelay: "0.5s" }}
            >
              <div className="text-[10px] font-bold text-violet-600 uppercase tracking-wider mb-2">Hook #1</div>
              <p className="text-xs text-slate-700 max-w-[180px] leading-relaxed">
                Most buyers never ask this one question — and it costs them thousands.
              </p>
            </div>

            {/* Floating chip — plan */}
            <div
              className="absolute bottom-4 -left-6 glass rounded-2xl px-4 py-3 shadow-[var(--shadow-lg)] float"
              style={{ transform: "perspective(800px) rotateY(8deg) rotateX(3deg)", animationDelay: "1.2s" }}
            >
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-cyan-600" />
                <div>
                  <div className="text-[10px] font-bold text-slate-600">7-Day Plan</div>
                  <div className="text-[11px] text-slate-500">Mon–Sun ready to post</div>
                </div>
              </div>
            </div>

            {/* Floating chip — generating */}
            <div
              className="absolute bottom-28 -right-2 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2.5 shadow-[var(--shadow-brand)] float"
              style={{ animationDelay: "2s" }}
            >
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-white" />
                <span className="text-xs font-bold text-white">Generated in 4s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating cards row — mobile only */}
        <div className="lg:hidden mt-12 space-y-4">
          {floatingCards.slice(0, 2).map((card) => (
            <div
              key={card.label}
              className={`glass rounded-2xl p-4 shadow-[var(--shadow-lg)] ${card.rotate}`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-blue-400 mb-1">
                {card.label}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade to page */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />
    </section>
  );
}
