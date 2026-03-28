export default function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="h-3 w-28 rounded bg-slate-200" />
          <div className="h-3 w-40 rounded bg-slate-100" />
        </div>
        <div className="h-8 w-24 rounded-lg bg-slate-200" />
      </div>

      {/* Caption cards */}
      {[120, 200].map((h) => (
        <div key={h} className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
          <div className="border-b border-slate-100 bg-slate-50 px-5 py-3">
            <div className="h-3 w-24 rounded bg-slate-200" />
          </div>
          <div className="p-5 space-y-2">
            <div className="h-3 rounded bg-slate-100 w-full" />
            <div className="h-3 rounded bg-slate-100 w-5/6" />
            {h > 130 && <div className="h-3 rounded bg-slate-100 w-4/5" />}
            {h > 130 && <div className="h-3 rounded bg-slate-100 w-3/4" />}
          </div>
        </div>
      ))}

      {/* Side by side */}
      <div className="grid sm:grid-cols-2 gap-4">
        {[3, 3].map((rows, i) => (
          <div key={i} className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
            <div className="border-b border-slate-100 bg-slate-50 px-5 py-3">
              <div className="h-3 w-20 rounded bg-slate-200" />
            </div>
            <div className="p-5 space-y-3">
              {Array.from({ length: rows }).map((_, j) => (
                <div key={j} className="flex gap-3 items-start py-1">
                  <div className="h-5 w-5 rounded-full bg-slate-200 shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 rounded bg-slate-100 w-full" />
                    <div className="h-3 rounded bg-slate-100 w-4/5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Weekly plan */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="border-b border-slate-100 bg-slate-50 px-5 py-3">
          <div className="h-3 w-32 rounded bg-slate-200" />
        </div>
        <div className="p-5 space-y-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex gap-3 items-start rounded-xl border border-slate-100 p-3">
              <div className="w-16 space-y-1">
                <div className="h-3 rounded bg-slate-200 w-12" />
                <div className="h-2.5 rounded bg-slate-100 w-14" />
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="h-2.5 rounded bg-slate-100 w-24" />
                <div className="h-3 rounded bg-slate-100 w-full" />
                <div className="h-3 rounded bg-slate-100 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
