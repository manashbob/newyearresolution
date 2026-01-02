// src/App.tsx
import React, { useEffect, useMemo, useState } from "react";
import { analyzeResolution, AnalysisResult } from "./analyzer";
 
export default function App(): JSX.Element {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
 
  // Prefill from ?q= on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) {
      setInput(q);
      setResult(analyzeResolution(q));
    }
  }, []);
 
  const badgeClass = useMemo(() => {
    switch (result?.verdict) {
      case "achievable": return "pill ok";
      case "optimistic": return "pill warn";
      case "delusional": return "pill nope";
      default: return "pill";
    }
  }, [result]);
 
  function assess() {
    const trimmed = input.trim();
    const r = analyzeResolution(trimmed);
    setResult(r);
    const url = new URL(window.location.href);
    if (trimmed) url.searchParams.set("q", trimmed);
    else url.searchParams.delete("q");
    window.history.replaceState({}, "", url.toString());
  }
 
  async function share() {
    const url = new URL(window.location.href);
    if (input.trim()) url.searchParams.set("q", input.trim());
    else url.searchParams.delete("q");
    try {
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // no-op
    }
  }
 
  function reset() {
    setInput("");
    setResult(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("q");
    window.history.replaceState({}, "", url.toString());
  }
 
  return (
<div className="app">
<header className="header">
<div className="logo" aria-hidden>🎉</div>
<div>
<h1 className="title">Resolution Reality Check</h1>
<p className="tag">Kind truth for ambitious humans</p>
</div>
</header>
 
      <section className="input-area" aria-label="Enter your resolution">
<label htmlFor="resolution" className="sr-only">Your New Year resolution</label>
<textarea
          id="resolution"
          placeholder="Write your resolution… e.g., Read 12 books • Run 3x/week • Save $200/month • Learn Spanish by September"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "enter") assess();
          }}
          rows={5}
        />
<div className="actions">
<button type="button" onClick={assess} className="primary">Assess my resolution</button>
<button type="button" onClick={share} className="ghost">{copied ? "Link copied!" : "Share (copy link)"}</button>
<button type="button" onClick={reset} className="ghost">Clear</button>
</div>
<p className="tip">Pro tip: specific beats vague. “3x/week for 30 minutes” &gt; “get fit”.</p>
</section>
 
      {result && (
<section className="result" aria-live="polite">
<div className={badgeClass}>{result.tag}</div>
<h2 className="headline">{result.headline}</h2>
<p className="copy">{result.advice}</p>
<div className="meta">
<span className="tiny">Signal score:</span>
<span className="score">{Math.round(result.score)}</span>
</div>
<div className="footer">
<p className="tiny">This is a vibe check, not a court ruling. You &gt; algorithms.</p>
</div>
</section>
      )}
</div>
  );
}