"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Menu, X, Zap } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/generate", label: "Generate" },
  { href: "/pricing",  label: "Pricing" },
  { href: "/about",    label: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isHome
          ? scrolled
            ? "glass border-b border-white/20 shadow-[var(--shadow-sm)]"
            : "bg-transparent border-b border-transparent"
          : "bg-white/90 border-b border-slate-200 backdrop-blur-sm shadow-[var(--shadow-xs)]"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-[var(--shadow-brand)] group-hover:shadow-[0_6px_20px_-4px_rgb(37_99_235/.5)] transition-shadow">
              <Sparkles size={15} />
            </div>
            <div className="hidden sm:block">
              <span className={`text-sm font-black tracking-tight ${isHome && !scrolled ? "text-white" : "text-slate-900"}`}>
                Content Calendar
              </span>
              <span className={`text-sm font-black tracking-tight gradient-text`}> Genius</span>
            </div>
            <span className={`sm:hidden text-sm font-black ${isHome && !scrolled ? "text-white" : "text-slate-900"}`}>
              CCG
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-3.5 py-2 text-sm font-semibold transition-all ${
                  pathname === link.href
                    ? isHome && !scrolled
                      ? "bg-white/10 text-white"
                      : "bg-blue-50 text-blue-700"
                    : isHome && !scrolled
                    ? "text-white/70 hover:bg-white/10 hover:text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <Link
              href="/generate"
              className="group flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2 text-sm font-bold text-white shadow-[var(--shadow-brand)] hover:shadow-[0_8px_24px_-4px_rgb(37_99_235/.5)] hover:-translate-y-0.5 transition-all"
            >
              <Zap size={14} />
              Try Free
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden rounded-xl p-2 transition-colors ${
              isHome && !scrolled
                ? "text-white/80 hover:bg-white/10"
                : "text-slate-500 hover:bg-slate-100"
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1 shadow-[var(--shadow-md)] animate-[slideUp_0.2s_ease-out]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center rounded-xl px-3.5 py-3 text-sm font-semibold transition-colors ${
                pathname === link.href
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/generate"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 mt-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-3 text-sm font-bold text-white"
          >
            <Zap size={15} />
            Try Free
          </Link>
        </div>
      )}
    </header>
  );
}
