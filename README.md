# Poll Finder

Search any topic or statement — "Animals are cute," "Traditional marriage is
better than progressive" — and see how public opinion breaks down by **age,
gender, country, region, and religion**.

## How it works

1. **Curated real data.** A small dataset of real, cited public-opinion
   topics (Gallup, Pew Research) lives in `src/data/polls.ts`. Each topic's
   overall figure is directly sourced. Every demographic breakdown is
   labeled either:
   - **Reported** — the key figures come directly from the cited survey.
   - **Modeled** — an illustrative approximation consistent with widely
     reported patterns, used where the source doesn't publish that exact
     crosstab (real pollsters rarely report age *and* gender *and* country
     *and* region *and* religion for the same question).

   Every breakdown's note explains exactly which numbers are which.

2. **Search matching.** `src/lib/search.ts` scores your query against each
   curated topic's keywords and picks the best match above a threshold.

3. **Optional AI query rewriting + live web search.** In Settings, you can
   paste your own Anthropic API key (`src/components/SettingsPanel.tsx`).
   It's stored only in your browser's local storage and used only for
   direct browser → Anthropic API calls (`src/lib/liveSearch.ts`) — never
   sent anywhere else, since this app has no backend. When a key is set and
   local keyword matching finds nothing, Poll Finder first asks Claude to
   check whether the search is a paraphrase or casual phrasing of a curated
   topic (e.g. "Is Trump good" → the curated Trump approval-rating poll) —
   this is real curated data, just reached through smarter query
   understanding instead of exact keywords. Only if nothing curated fits
   does it fall back to the `web_search` server tool to try to find a real,
   citable external poll. Either way, it only returns a result backed by a
   genuine source — it will not fabricate one, and only demographic
   breakdowns the source itself reports are shown for a live result.

4. **Honest fallback.** If there's no API key, or the live search finds
   nothing real either, `src/lib/estimate.ts` generates a clearly labeled
   **estimate** instead of pretending a real poll exists. This isn't a
   random number: it's anchored to the closest related topics already in
   the curated dataset (weighted by keyword relevance), so it starts from a
   real, comparable base rate rather than pure noise — and if nothing in
   the dataset relates to the search either, it falls back to a neutral,
   explicitly-labeled baseline. Same query → same numbers, but it is still
   not real survey data, and the app always says exactly why you're seeing
   an estimate.

## Development

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check and build for production
npm run lint     # oxlint
```

Built with React, TypeScript, and Vite. The chart is a hand-built SVG
diverging stacked bar (centered on the neutral/no-opinion segment), styled
for both light and dark mode.
