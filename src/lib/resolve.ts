import { POLL_TOPICS } from '../data/polls';
import type { PollResult } from '../data/types';
import { resolveViaAI } from './liveSearch';

/**
 * Called only when no curated topic keyword-matched the query. Tries AI-assisted matching
 * against the curated dataset, then live web search, in that order. Returns null when
 * nothing real is found either way — callers should show a "no results" state, never a
 * fabricated chart.
 */
export async function resolveWithoutKeywordMatch(query: string, apiKey: string): Promise<PollResult | null> {
  const trimmed = query.trim();
  if (!trimmed || !apiKey) return null;

  const outcome = await resolveViaAI(
    apiKey,
    trimmed,
    POLL_TOPICS.map((t) => ({ id: t.id, query: t.query, category: t.category })),
  );

  if (outcome.kind === 'matched') {
    const topic = POLL_TOPICS.find((t) => t.id === outcome.topicId);
    if (topic) {
      return {
        kind: 'real',
        topic,
        rawQuery: trimmed,
        matchMethod: 'ai',
        queryInterpretation: outcome.queryInterpretation,
      };
    }
  }

  if (outcome.kind === 'found') {
    return { kind: 'live', topic: outcome.topic, rawQuery: trimmed };
  }

  return null;
}
