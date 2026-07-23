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

3. **AI-simulated fallback.** If nothing in the curated set matches closely
   enough, `src/lib/estimate.ts` generates a clearly labeled **AI-simulated
   estimate** instead of pretending a real poll exists. This isn't a random
   number: it's anchored to the closest related topics already in the
   curated dataset (weighted by keyword relevance), so it starts from a real,
   comparable base rate rather than pure noise — and if literally nothing
   in the dataset relates to the search, it falls back to a neutral,
   explicitly-labeled baseline instead of guessing. Same query → same
   numbers, but it is still not real survey data, and the app tells you
   exactly why you're seeing an estimate and what it's anchored to.

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
