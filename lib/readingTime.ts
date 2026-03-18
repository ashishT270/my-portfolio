export function readingTime(lines: string[], wpm = 200): string {
  const words = lines.join(" ").split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / wpm));
  return `${mins} min read`;
}
