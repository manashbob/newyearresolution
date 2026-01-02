// src/analyzer.ts
export type Verdict = "achievable" | "optimistic" | "delusional";
 
export interface AnalysisResult {
  verdict: Verdict;
  tag: string;
  headline: string;
  advice: string;
  score: number;
}
 
const spelled = [
  "one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve"
];
 
const timeUnits = [
  "day","days","week","weeks","month","months","year","years","daily","weekly","monthly","quarter","quarters"
];
 
const absolutes = ["never","always","forever","no exceptions","every single day"];
 
const ambitiousKeywords = [
  "marathon","half marathon","ultra","startup","business",
  "promotion","promote","raise","career change","switch career",
  "learn","language","fluency","spanish","french","german","mandarin","japanese",
  "public speaking","publish","newsletter","course","write a book","book a talk",
  "lose","pounds","kg","save","$","k","invest","budget"
];
 
const delusionKeywords = [
  "billionaire","billion","unicorn","nobel","olympic","olympics","world champion","world record",
  "viral","million followers","1,000,000 followers","1 million followers","be famous",
  "six pack in 2 weeks","six-pack in 2 weeks","abs in 2 weeks"
];
 
function normalize(s: string): string {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}
 
function hasNumberish(s: string): boolean {
  return /\d/.test(s) || spelled.some(w => s.includes(w));
}
 
function containsAny(s: string, list: string[]): boolean {
  return list.some(w => s.includes(w));
}
 
function numberNearUnitScore(s: string): number {
  let score = 0;
  if (/\b\d+\s?(x|times|per|\/)\s?(day|week|month|year|daily|weekly|monthly)\b/.test(s)) score += 25;
  if (/\b\d+\s?(minutes?|hrs?|hours?)\b/.test(s)) score += 15;
  if (/\b\d+\s?(books?|miles?|km|kilometers?|pushups?|pages?|dollars?|£|€|\$)\b/.test(s)) score += 15;
  if (timeUnits.some(u => s.includes(u))) score += 10;
  return score;
}
 
function absolutePenalty(s: string): number {
  let p = 0;
  if (containsAny(s, absolutes)) p += 25;
  if (/\bevery day\b/.test(s)) p += 10;
  if (/\b(no|zero)\s+sugar\b/.test(s)) p += 10;
  return p;
}
 
function delusionHit(s: string): boolean {
  if (containsAny(s, delusionKeywords)) return true;
 
  const huge = ["millionaire","billionaire","unicorn","nobel","olympic","world champion","world record","movie star"];
  if (containsAny(s, huge) && /\b(this|next)?\s?(month|year|week|q[1-4]|quarter)\b/.test(s)) return true;
 
  if (/\b(fluent|fluency)\b.*\b(week|two weeks|7 days|14 days|month)\b/.test(s)) return true;
 
  if (/\bsix[- ]?pack|abs\b.*\b(week|two weeks|7|14|21)\s?(days?|weeks?)\b/.test(s)) return true;
 
  if (/\b1\s?000\s?000\b|\b1,000,000\b|\b1\s?million\b/.test(s) && /\b(week|month|30 days)\b/.test(s)) return true;
 
  return false;
}
 
function ambitionScore(s: string): number {
  let score = 0;
  if (containsAny(s, ambitiousKeywords)) score += 15;
  if (/\bmarathon\b/.test(s)) score += 15;
  if (/\b(start|launch|build)\b/.test(s)) score += 10;
  if (/\b(promote|promotion|raise)\b/.test(s)) score += 10;
  if (/\b(learn|study|practice)\b/.test(s)) score += 8;
  return score;
}
 
export function analyzeResolution(raw: string): AnalysisResult {
  const text = normalize(raw);
 
  // Empty input guard
  if (!text) {
    return {
      verdict: "achievable",
      tag: "Actually achievable ✅",
      headline: "Start with something you can do today.",
      advice: "Write a one-sentence resolution with a small scope and a weekly cadence.",
      score: 0
    };
  }
 
  // Hard delusion flags
  if (delusionHit(text)) {
    return {
      verdict: "delusional",
      tag: "Delusional (but we admire the confidence) 🚀",
      headline: "We love the audacity. Physics and calendars are less impressed.",
      advice: "Keep the dream; resize the timeline. Pick a 4–8 week mini‑goal that proves the concept.",
      score: 15
    };
  }
 
  // Scoring
  let score = 50;
  score += numberNearUnitScore(text);
  score += hasNumberish(text) ? 8 : 0;
  score += ambitionScore(text);
  score -= absolutePenalty(text);
 
  // Vague goal penalties
  const vaguePatterns = /(get fit|be healthier|work harder|be happy|be productive|do more|improve)/;
  if (!hasNumberish(text) && !timeUnits.some(u => text.includes(u))) score -= 12;
  if (vaguePatterns.test(text)) score -= 10;
 
  // Very aggressive cadence penalty
  if (/\b(7x|7 times|every day)\b/.test(text)) score -= 6;
 
  score = Math.max(0, Math.min(score, 100));
 
  if (score >= 70) {
    return {
      verdict: "achievable",
      tag: "Actually achievable ✅",
      headline: "Refreshingly sane. Your future self can high‑five this without spraining a wrist.",
      advice: "Put the first 30‑minute rep on your calendar this week. Systems > vibes.",
      score
    };
  } else if (score >= 45) {
    const needsCadence = !/\b(per|\/|x)\b/.test(text) && !/\b(daily|weekly|monthly)\b/.test(text);
    return {
      verdict: "optimistic",
      tag: "Optimistic but possible 💪",
      headline: "Spicy, but doable—with structure and a realistic ramp.",
      advice: needsCadence
        ? "Make it concrete: Try “3x/week for 20–30 min” and add a 4‑week check‑in to adjust."
        : "Pilot it for 4 weeks. If it sticks 60%+ of the time, level up. If not, make it easier.",
      score
    };
  } else {
    return {
      verdict: "delusional",
      tag: "Delusional (but we admire the confidence) 🚀",
      headline: "Your goal is serving main‑character energy. Your schedule is a background extra.",
      advice: "Shrink the scope by 80% and extend the timeline by 3×. Make it winnable in weeks, not montages.",
      score
    };
  }
}