import Link from "next/link";
import { Sparkles, Globe, Share2, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-900 border-t border-slate-800">
      {/* Subtle gradient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 120%, rgb(37 99 235 / .08) 0%, transparent 70%)" }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-white">
                <Sparkles size={15} />
              </div>
              <span className="font-black text-white text-sm">Content Calendar Genius</span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Social media content for real estate agents — generated in seconds. Turn one idea into a full week of posts.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[
                { icon: <Share2 size={15} />, label: "X / Twitter" },
                { icon: <MessageCircle size={15} />, label: "Instagram" },
                { icon: <Globe size={15} />, label: "LinkedIn" },
              ].map((s) => (
                <span
                  key={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-400 hover:border-blue-500 hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {s.icon}
                </span>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Product</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/generate", label: "Generate Content" },
                { href: "/pricing",  label: "Pricing" },
                { href: "/about",    label: "About" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Legal</h3>
            <ul className="space-y-2.5">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((t) => (
                <li key={t}>
                  <span className="text-sm text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Content Calendar Genius. Built for real estate agents.
          </p>
          <p className="text-xs text-slate-600">
            Powered by Claude AI · Made with ♥ for Realtors
          </p>
        </div>
      </div>
    </footer>
  );
}
