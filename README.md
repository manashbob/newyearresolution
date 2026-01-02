# Resolution Reality Check
 
Kind truth for ambitious humans on January 1st. Paste your New Year resolution, and this tiny app gives you a witty, honest verdict:
- Actually achievable
- Optimistic but possible
- Delusional (but we admire the confidence)
 
Zero backend. Zero install. 100% vibe check.
 
---
 
## Features
 
- Dynamic input (not a canned list): type any resolution and get instant feedback
- Friendly copy with a self-aware tone
- Simple, explainable heuristics (no ML)—prioritizes specificity, cadence, and scope
- Shareable deep link (?q=...) so you can paste a prefilled URL
- Keyboard shortcut: Ctrl/Cmd + Enter to assess
- Accessible and responsive UI
 
---
 
## Tech Stack
 
- React 18 + TypeScript
- Vite for dev/build
- Single-page, client-only app (no server)
 
---
 
## Quick Start on StackBlitz (no installs)
 
1. Open https://stackblitz.com
2. Create a new project: Vite + React + TypeScript
3. Replace the default files with the ones from this project:
   - package.json
   - tsconfig.json
   - vite.config.ts
   - index.html
   - src/main.tsx
   - src/App.tsx
   - src/analyzer.ts
   - src/styles.css
4. Hit Run. Share the live URL.
 
Tip: If you see a JSX error about the ">" character, ensure it's escaped as `&gt;` in JSX text nodes (already handled in `App.tsx`).
 
---
 
## Run Locally
 
Prereqs:
- Node.js 18+ (or 20+)
- npm (or pnpm/yarn)
 
Install and run:
 
 
bash npm install npm run dev
 
Build and preview:
 
 
bash npm run build npm run preview
 
Open http://localhost:5173
 
---
 
## Project Structure
 
 
text . ├─ index.html ├─ package.json ├─ tsconfig.json ├─ vite.config.ts └─ src ├─ App.tsx # UI + interactions ├─ analyzer.ts # Heuristic engine ├─ main.tsx # App bootstrap └─ styles.css # Styling (responsive, accessible)
 
---
 
## How It Works (Heuristics)
 
The analyzer favors realistic, schedulable goals:
- Rewards specificity: numbers near units (e.g., "3x/week", "30 minutes", "12 books", "200/month")
- Rewards cadence/timeframes: “weekly”, “monthly”, etc.
- Penalizes absolutes: “never”, “always”, “forever”
- Flags obviously unrealistic combos (e.g., “million followers in a month”, “six-pack in two weeks”)
- Soft penalty for vague statements: “get fit”, “be productive”
- Produces a score from 0–100 and maps to:
  - 70–100: Actually achievable
  - 45–69: Optimistic but possible
  - 0–44: Delusional (but we admire the confidence)
 
Note: This is a playful heuristic, not medical/financial/career advice.
 
---
 
## Usage
 
- Type your resolution into the text area
- Click “Assess my resolution” (or press Ctrl/Cmd + Enter)
- Read the verdict and suggested next step
- Click “Share (copy link)” to copy a URL with your resolution prefilled
 
---
 
## Customization
 
Tweak the tone or rules in `src/analyzer.ts`:
- Add/remove keywords in `ambitiousKeywords` and `delusionKeywords`
- Adjust scoring functions: `numberNearUnitScore`, `absolutePenalty`, `ambitionScore`
- Change thresholds for verdicts
 
Update UI text/voice in `src/App.tsx` and styles in `src/styles.css`.
 
---
 
## Accessibility
 
- Semantic landmarks and labels
- Live region for results (`aria-live="polite"`)
- Sufficient color contrast
- Keyboard-friendly controls
 
---
 
## Troubleshooting
 
- JSX “>” error in text: Use `&gt;` inside JSX text nodes.
- Clipboard permission blocked: Some browsers require user interaction; click the Share button after interacting with the page.
 
---
 
## Roadmap (nice-to-haves)
 
- Unit tests for `analyzer.ts`
- Tone slider (gentle ↔ spicy)
- Confetti on “Actually achievable”
- Export/share image
 
---
 
## License
 
MIT — do great things and be kind.