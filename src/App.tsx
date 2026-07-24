import { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { SettingsPanel } from './components/SettingsPanel';
import { ResultView } from './components/ResultView';
import { resolveQuery } from './lib/resolve';
import { getStoredApiKey, setStoredApiKey } from './lib/apiKeyStore';
import type { PollResult } from './data/types';

function App() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<PollResult | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(getStoredApiKey);

  function saveApiKey(key: string) {
    setApiKey(key);
    setStoredApiKey(key);
  }

  async function runSearch(q: string) {
    setQuery(q);
    setSearched(true);
    setLoading(true);
    setResult(null);
    try {
      const r = await resolveQuery(q, apiKey);
      setResult(r);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-top">
          <div className="app-header-spacer" />
          <SettingsPanel apiKey={apiKey} onSave={saveApiKey} />
        </div>
        <h1>Poll Finder</h1>
        <p className="app-subtitle">
          Search any topic or statement to see how public opinion breaks down by age, gender, country, region, and
          religion.
        </p>
      </header>

      <main className="app-main">
        <SearchBar onSearch={runSearch} initialValue={query} />

        {loading && (
          <p className="empty-state">
            {apiKey ? 'Checking the curated dataset and searching the web…' : 'Checking the curated dataset…'}
          </p>
        )}

        {!loading && searched && !result && (
          <p className="empty-state">Type a topic or statement above to see the poll breakdown.</p>
        )}

        {!loading && result && <ResultView result={result} />}

        <section className="about">
          <h2>How this works</h2>
          <p>
            Poll Finder first checks a small curated set of real, cited public-opinion topics. When your search
            matches one closely enough, you see genuine published figures — each chart shows exactly which
            demographic breakdowns are directly reported by the source versus modeled/illustrative approximations.
          </p>
          <p>
            If nothing matches and you've added your own Anthropic API key in Settings, Poll Finder searches the
            live web for a real, citable poll instead. If a real source is found, you see it labeled{' '}
            <strong>live web search result</strong> with its source link. If no real data exists anywhere — in the
            curated set or on the web — you see a clearly labeled, deterministic <strong>estimate</strong> instead
            of a fabricated chart pretending to be real.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
