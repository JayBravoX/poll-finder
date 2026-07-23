import { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { ExampleChips } from './components/ExampleChips';
import { ResultView } from './components/ResultView';
import { resolveQuery } from './lib/resolve';
import type { PollResult } from './data/types';

function App() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<PollResult | null>(null);
  const [searched, setSearched] = useState(false);

  function runSearch(q: string) {
    setQuery(q);
    setSearched(true);
    setResult(resolveQuery(q));
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Poll Finder</h1>
        <p className="app-subtitle">
          Search any topic or statement to see how public opinion breaks down by age, gender, country, region, and
          religion.
        </p>
      </header>

      <main className="app-main">
        <SearchBar onSearch={runSearch} initialValue={query} />
        <ExampleChips onPick={runSearch} />

        {searched && !result && (
          <p className="empty-state">Type a topic or statement above to see the poll breakdown.</p>
        )}

        {result && <ResultView result={result} />}

        <section className="about">
          <h2>How this works</h2>
          <p>
            Poll Finder first checks a small curated set of real, cited public-opinion topics. When your search
            matches one closely enough, you see genuine published figures — each chart shows exactly which
            demographic breakdowns are directly reported by the source versus modeled/illustrative approximations.
          </p>
          <p>
            When nothing in the curated set matches, Poll Finder generates a clearly labeled{' '}
            <strong>AI-simulated estimate</strong> instead of pretending a real poll exists. Simulated results are
            deterministic (the same search always produces the same numbers) but are not measurements of real
            opinion — treat them as illustrative only.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
