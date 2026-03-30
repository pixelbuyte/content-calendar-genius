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
            : "bg-slate-900/80 border-b border-white/10 backdrop-blur-sm"
          : "bg-slate-900 border-b border-slate-700 shadow-[var(--shadow-xs)]"
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
              <span className="text-sm font-black tracking-tight bg-gradient-to-r from-rose-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                Content Calendar
              </span>
              <span className="text-sm font-black tracking-tight bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400 bg-clip-text text-transparent"> Genius</span>
            </div>
            <span className="sm:hidden text-sm font-black text-white">
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
                    ? "bg-white/10 bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
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
              className="group flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 px-4 py-2 text-sm font-bold text-white shadow-[var(--shadow-brand)] hover:shadow-[0_8px_24px_-4px_rgb(139_92_246/.5)] hover:-translate-y-0.5 transition-all"
            >
              <Zap size={14} />
              Try Free
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden rounded-xl p-2 transition-colors text-white/80 hover:bg-white/10"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-700 bg-slate-900 px-4 py-4 space-y-1 shadow-[var(--shadow-md)]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center rounded-xl px-3.5 py-3 text-sm font-semibold transition-colors ${
                pathname === link.href
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
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
