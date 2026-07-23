import { useEffect, useState } from 'react';
import type { DimensionKey, GroupSplit, PollResult } from '../data/types';
import { DivergingBarChart } from './DivergingBarChart';
import { DimensionTabs } from './DimensionTabs';

interface ResultViewProps {
  result: PollResult;
}

export function ResultView({ result }: ResultViewProps) {
  const { topic, kind } = result;
  const [active, setActive] = useState<DimensionKey | 'overall'>('overall');

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
        <span className={`badge ${kind === 'real' ? 'badge-real' : 'badge-estimated'}`}>
          {kind === 'real' ? 'Real poll data' : 'AI-simulated estimate'}
        </span>
        {kind === 'real' && <span className="result-category">{topic.category}</span>}
      </div>

      <h2 className="result-question">{topic.query}</h2>

      <DimensionTabs available={available} active={active} onChange={setActive} />

      {activeBreakdown && (
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

      <div className="source-card">
        {kind === 'real' ? (
          <>
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
          </>
        ) : (
          <>
            <div className="source-title">{topic.source.title}</div>
            <div className="source-meta">{topic.source.sampleNote}</div>
          </>
        )}
      </div>
    </div>
  );
}
