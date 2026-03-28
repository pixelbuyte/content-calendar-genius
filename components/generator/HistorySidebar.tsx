"use client";

import { useEffect, useState } from "react";
import { Clock, Trash2 } from "lucide-react";
import type { HistoryItem } from "@/lib/types";
import { getHistory, clearHistory } from "@/lib/storage";

interface HistorySidebarProps {
  onSelect: (item: HistoryItem) => void;
  currentPackId?: string;
}

export default function HistorySidebar({ onSelect, currentPackId }: HistorySidebarProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, [currentPackId]); // Refresh when a new generation happens

  const handleClear = () => {
    clearHistory();
    setHistory([]);
  };

  if (history.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-2 mb-3">
          <Clock size={14} className="text-slate-400" />
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Recent
          </span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Your recent generations will appear here after you generate your first pack.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <div className="border-b border-slate-100 bg-slate-50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock size={13} className="text-slate-400" />
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Recent
          </span>
        </div>
        <button
          onClick={handleClear}
          className="rounded p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          title="Clear history"
        >
          <Trash2 size={13} />
        </button>
      </div>
      <div className="divide-y divide-slate-100">
        {history.slice(0, 10).map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className={`w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors ${
              item.id === currentPackId ? "bg-brand-50" : ""
            }`}
          >
            <p
              className={`text-xs font-medium leading-snug line-clamp-2 ${
                item.id === currentPackId ? "text-brand-700" : "text-slate-700"
              }`}
            >
              {item.topic}
            </p>
            <div className="mt-1 flex items-center gap-2">
              <span className="capitalize text-[11px] text-slate-400">{item.tone}</span>
              <span className="text-slate-200">·</span>
              <span className="text-[11px] text-slate-400">
                {new Date(item.generatedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
