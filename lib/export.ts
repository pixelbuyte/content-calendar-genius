import type { ContentPack } from "./types";

export function exportPackAsText(pack: ContentPack): string {
  const divider = "─".repeat(52);
  const lines: string[] = [];

  lines.push("CONTENT CALENDAR GENIUS — CONTENT PACK");
  lines.push(divider);
  lines.push(`Topic:     ${pack.topic}`);
  lines.push(`Tone:      ${pack.tone.charAt(0).toUpperCase() + pack.tone.slice(1)}`);
  lines.push(`Platforms: ${pack.platforms.join(", ")}`);
  lines.push(`Generated: ${new Date(pack.generatedAt).toLocaleString()}`);
  lines.push(divider);
  lines.push("");

  lines.push("SHORT CAPTION");
  lines.push(divider);
  lines.push(pack.shortCaption);
  lines.push("");

  lines.push("LONG CAPTION");
  lines.push(divider);
  lines.push(pack.longCaption);
  lines.push("");

  lines.push("HOOK IDEAS");
  lines.push(divider);
  pack.hooks.forEach((h, i) => lines.push(`${i + 1}. ${h}`));
  lines.push("");

  lines.push("TITLE IDEAS");
  lines.push(divider);
  pack.titles.forEach((t, i) => lines.push(`${i + 1}. ${t}`));
  lines.push("");

  lines.push("7-DAY POSTING PLAN");
  lines.push(divider);
  pack.weeklyPlan.forEach((d) => {
    lines.push(`${d.day.padEnd(10)} [${d.postType}] — ${d.platform}`);
    lines.push(`           ${d.idea}`);
  });
  lines.push("");

  lines.push("CTA SUGGESTIONS");
  lines.push(divider);
  pack.ctaSuggestions.forEach((c, i) => lines.push(`${i + 1}. ${c}`));
  lines.push("");

  lines.push("HASHTAGS");
  lines.push(divider);
  lines.push(pack.hashtags.join(" "));
  lines.push("");

  if (Object.keys(pack.platformTips).length > 0) {
    lines.push("PLATFORM TIPS");
    lines.push(divider);
    Object.entries(pack.platformTips).forEach(([platform, tip]) => {
      lines.push(`${platform.toUpperCase()}: ${tip}`);
    });
  }

  return lines.join("\n");
}

export function downloadText(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
