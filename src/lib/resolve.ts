import { POLL_TOPICS } from '../data/polls';
import type { PollResult } from '../data/types';
import { buildEstimatedTopic } from './estimate';
import { resolveViaAI } from './liveSearch';
import { findBestMatch } from './search';

export async function resolveQuery(query: string, apiKey: string): Promise<PollResult | null> {
  const trimmed = query.trim();
  if (!trimmed) return null;

  const hit = findBestMatch(trimmed);
  if (hit) {
    return { kind: 'real', topic: hit.topic, rawQuery: trimmed, matchScore: hit.score, matchMethod: 'keyword' };
  }

  if (apiKey) {
    try {
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

      const topic = buildEstimatedTopic(trimmed);
      topic.source.sampleNote = `AI-assisted matching against the curated dataset and a live web search both found no real, citable poll. ${topic.source.sampleNote ?? ''}`;
      return { kind: 'estimated', topic, rawQuery: trimmed };
    } catch (err) {
      const topic = buildEstimatedTopic(trimmed);
      const message = err instanceof Error ? err.message : 'unknown error';
      topic.source.sampleNote = `Live search failed (${message}) — showing a baseline estimate instead. ${topic.source.sampleNote ?? ''}`;
      return { kind: 'estimated', topic, rawQuery: trimmed };
    }
  }

  const topic = buildEstimatedTopic(trimmed);
  topic.source.sampleNote = `No Anthropic API key is set, so no AI-assisted matching or live web search was attempted. ${topic.source.sampleNote ?? ''}`;
  return { kind: 'estimated', topic, rawQuery: trimmed };
}
