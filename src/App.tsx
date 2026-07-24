import { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { SettingsPanel } from './components/SettingsPanel';
import { ResultView } from './components/ResultView';
import { SearchResultsList } from './components/SearchResultsList';
import { NoResults } from './components/NoResults';
import { resolveWithoutKeywordMatch } from './lib/resolve';
import { listablePolls, type SearchHit } from './lib/search';
import { getStoredApiKey, setStoredApiKey } from './lib/apiKeyStore';
import type { PollResult } from './data/types';

type View =
  | { kind: 'idle' }
  | { kind: 'loading'; query: string }
  | { kind: 'list'; query: string; hits: SearchHit[] }
  | { kind: 'detail'; result: PollResult; fromList: SearchHit[] | null }
  | { kind: 'denied'; query: string };

function App() {
  const [query, setQuery] = useState('');
  const [view, setView] = useState<View>({ kind: 'idle' });
  const [apiKey, setApiKey] = useState(getStoredApiKey);

  function saveApiKey(key: string) {
    setApiKey(key);
    setStoredApiKey(key);
  }

  async function runSearch(q: string) {
    setQuery(q);
    const hits = listablePolls(q);

    if (hits.length > 0) {
      setView({ kind: 'list', query: q, hits });
      return;
    }

    setView({ kind: 'loading', query: q });
    const result = await resolveWithoutKeywordMatch(q, apiKey);
    setView(result ? { kind: 'detail', result, fromList: null } : { kind: 'denied', query: q });
  }

  function selectHit(hit: SearchHit, fromList: SearchHit[]) {
    setView({
      kind: 'detail',
      result: { kind: 'real', topic: hit.topic, rawQuery: query, matchMethod: 'keyword', matchScore: hit.score },
      fromList,
    });
  }

  function backToList() {
    if (view.kind === 'detail' && view.fromList) {
      setView({ kind: 'list', query, hits: view.fromList });
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

        {view.kind === 'loading' && (
          <p className="empty-state">
            {apiKey ? 'Checking for a real poll and searching the web…' : 'Checking the curated dataset…'}
          </p>
        )}

        {view.kind === 'list' && (
          <SearchResultsList hits={view.hits} query={view.query} onSelect={(hit) => selectHit(hit, view.hits)} />
        )}

        {view.kind === 'detail' && (
          <ResultView result={view.result} onBack={view.fromList ? backToList : undefined} />
        )}

        {view.kind === 'denied' && <NoResults query={view.query} hasApiKey={Boolean(apiKey)} />}

        <section className="about">
          <h2>How this works</h2>
          <p>
            Poll Finder only shows real, cited public-opinion data. Search checks a curated dataset of real,
            sourced poll topics first — like search results, matching topics are listed so you can pick the one you
            mean. Each chart then shows exactly which demographic breakdowns are directly reported by the source
            versus modeled/illustrative approximations.
          </p>
          <p>
            If nothing in the curated set matches and you've added your own Anthropic API key in Settings, Poll
            Finder checks whether your search is a paraphrase of a curated topic, then searches the live web for a
            real, citable poll. If nothing real exists anywhere — in the curated set or on the web — the search is
            declined rather than shown as a fabricated chart.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
