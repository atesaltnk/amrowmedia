import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Clamp a number into a range. */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Format a 0–1 scroll progress as an SMPTE-style timecode (HH:MM:SS:FF at 24fps).
 * Used by the scroll HUD — it turns "how far down the page am I" into a unit a
 * film crew already reads fluently.
 */
export function toTimecode(progress: number, totalSeconds = 90, fps = 24) {
  const t = clamp(progress, 0, 1) * totalSeconds;
  const hours = Math.floor(t / 3600);
  const minutes = Math.floor((t % 3600) / 60);
  const seconds = Math.floor(t % 60);
  const frames = Math.floor((t % 1) * fps);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
}
