import { useEffect, useState } from 'react';
import type { DimensionKey, GroupSplit, PollResult } from '../data/types';
import { DivergingBarChart } from './DivergingBarChart';
import { DimensionTabs } from './DimensionTabs';

interface ResultViewProps {
  result: PollResult;
}

const BADGE_LABEL: Record<PollResult['kind'], string> = {
  real: 'Real poll data',
  live: 'Live web search result',
  estimated: 'No real data found — estimate',
};

export function ResultView({ result }: ResultViewProps) {
  const { topic, kind } = result;
  const [active, setActive] = useState<DimensionKey | 'overall'>('overall');
  const hasSource = kind === 'real' || kind === 'live';

  useEffect(() => {
    setActive('overall');
  }, [topic.id]);

  const available = Object.keys(topic.breakdowns) as DimensionKey[];
  const activeBreakdown = active === 'overall' ? null : topic.breakdowns[active];

  const rows: GroupSplit[] =
    active === 'overall'
      ? [{ group: 'Overall', ...topic.overall }]
      : (activeBreakdown?.groups ?? []);

  return (
    <div className="result">
      <div className="result-header">
        <span className={`badge badge-${kind}`}>{BADGE_LABEL[kind]}</span>
        {hasSource && <span className="result-category">{topic.category}</span>}
      </div>

      <h2 className="result-question">{topic.query}</h2>

      {result.matchMethod === 'ai' && result.rawQuery.toLowerCase() !== topic.query.toLowerCase() && (
        <p className="ai-match-note">
          Interpreted “{result.rawQuery}” as the closest real poll question above.
        </p>
      )}

      {kind === 'estimated' && (
        <p className="estimate-explainer">
          <strong>Why you're seeing this:</strong> no topic in Poll Finder's curated, real-poll dataset matched
          this search closely enough to show genuine survey data. Rather than inventing numbers and presenting
          them as if they were real, the chart below is a clearly labeled, methodology-transparent estimate.{' '}
          {topic.source.sampleNote}
        </p>
      )}

      {kind === 'live' && (
        <p className="live-explainer">
          <strong>Found via live web search:</strong> no topic in the curated dataset matched this search, so
          Claude searched the web (using your Anthropic API key) and found the real source cited below. Only
          demographic breakdowns that source itself reports are shown.
        </p>
      )}

      <DimensionTabs available={available} active={active} onChange={setActive} />

      {hasSource && activeBreakdown && (
        <p className={`breakdown-note ${activeBreakdown.confidence === 'reported' ? 'note-reported' : 'note-modeled'}`}>
          <strong>{activeBreakdown.confidence === 'reported' ? 'Reported: ' : 'Modeled: '}</strong>
          {activeBreakdown.note ??
            (activeBreakdown.confidence === 'reported'
              ? 'These figures are directly from the cited source.'
              : 'These figures are illustrative approximations, not an exact reproduced crosstab.')}
        </p>
      )}

      <DivergingBarChart
        key={topic.id}
        rows={rows}
        agreeLabel={topic.agreeLabel}
        neutralLabel={topic.neutralLabel}
        disagreeLabel={topic.disagreeLabel}
      />

      {hasSource && (
        <div className="source-card">
          <div className="source-org">{topic.source.org}</div>
          <div className="source-title">
            {topic.source.url ? (
              <a href={topic.source.url} target="_blank" rel="noreferrer">
                {topic.source.title}
              </a>
            ) : (
              topic.source.title
            )}
          </div>
          <div className="source-meta">
            {topic.source.date}
            {topic.source.sampleNote ? ` · ${topic.source.sampleNote}` : ''}
          </div>
        </div>
      )}
    </div>
  );
}
