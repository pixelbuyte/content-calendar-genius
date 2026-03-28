import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Realtor, RE/MAX Gold",
    location: "Austin, TX",
    avatar: "SM",
    rating: 5,
    text: "I used to spend 45 minutes writing one Instagram caption. Now I generate a full week of content in under a minute. This tool is a game changer for agents who want to stay consistent.",
    gradient: "from-blue-500 to-violet-600",
  },
  {
    name: "Marcus Johnson",
    role: "Top Producer, Keller Williams",
    location: "Atlanta, GA",
    avatar: "MJ",
    rating: 5,
    text: "The hooks it generates are so good. My engagement went up 3x in the first two weeks. Finally a tool that actually sounds like a real estate agent, not a robot.",
    gradient: "from-violet-500 to-pink-500",
  },
  {
    name: "Diane Torres",
    role: "Luxury Specialist, Coldwell Banker",
    location: "Miami, FL",
    avatar: "DT",
    rating: 5,
    text: "The luxury tone setting is perfect for my brand. I can post every day without my content feeling repetitive. My clients actually comment on how polished my social media looks now.",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    name: "Kevin Park",
    role: "Buyer's Agent, Century 21",
    location: "Seattle, WA",
    avatar: "KP",
    rating: 5,
    text: "The 7-day posting plan is my favorite feature. I plan my whole week in 5 minutes on Sunday and I'm done. My listings get way more views since I started using this consistently.",
    gradient: "from-emerald-500 to-cyan-500",
  },
  {
    name: "Rachel Nguyen",
    role: "Team Lead, eXp Realty",
    location: "Dallas, TX",
    avatar: "RN",
    rating: 5,
    text: "I send the content packs to my VA to post while I focus on closing deals. The hashtags are spot-on and the captions don't sound generic at all. Worth every penny.",
    gradient: "from-orange-500 to-rose-500",
  },
  {
    name: "James Carter",
    role: "New Agent, First Team",
    location: "Phoenix, AZ",
    avatar: "JC",
    rating: 5,
    text: "As a new agent trying to build my brand, I had no idea what to post. This tool gave me structure and confidence. My follower count doubled in 30 days.",
    gradient: "from-blue-600 to-indigo-600",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="mesh-light py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <span className="section-label">Loved By Agents</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Real agents. Real results.
          </h2>
          <p className="mt-4 text-slate-500 max-w-lg mx-auto">
            Hundreds of realtors are posting more consistently and spending less time doing it.
          </p>
        </div>

        {/* Two-column masonry */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="card-3d break-inside-avoid rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[var(--shadow-sm)]"
            >
              <Stars count={t.rating} />
              <p className="mt-3 text-sm text-slate-700 leading-relaxed">&quot;{t.text}&quot;</p>
              <div className="mt-5 flex items-center gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.gradient} text-white text-xs font-bold`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-400">{t.role} · {t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-5">
          {[
            { value: "2,400+", label: "Agents using CCG" },
            { value: "18,000+", label: "Content packs generated" },
            { value: "< 30s",  label: "Average generation time" },
            { value: "4.9★",   label: "Average user rating" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-[var(--shadow-xs)]">
              <div className="text-3xl font-black gradient-text">{stat.value}</div>
              <div className="mt-1 text-xs text-slate-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
