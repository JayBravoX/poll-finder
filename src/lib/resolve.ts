import type { PollResult } from '../data/types';
import { buildEstimatedTopic } from './estimate';
import { fetchLiveResult } from './liveSearch';
import { findBestMatch } from './search';

export async function resolveQuery(query: string, apiKey: string): Promise<PollResult | null> {
  const trimmed = query.trim();
  if (!trimmed) return null;

  const hit = findBestMatch(trimmed);
  if (hit) {
    return { kind: 'real', topic: hit.topic, matchScore: hit.score };
  }

  if (apiKey) {
    try {
      const live = await fetchLiveResult(apiKey, trimmed);
      if (live.found) {
        return { kind: 'live', topic: live.topic };
      }
      const topic = buildEstimatedTopic(trimmed);
      topic.source.sampleNote = `A live web search was attempted and found no real, citable poll either. ${topic.source.sampleNote ?? ''}`;
      return { kind: 'estimated', topic };
    } catch (err) {
      const topic = buildEstimatedTopic(trimmed);
      const message = err instanceof Error ? err.message : 'unknown error';
      topic.source.sampleNote = `Live web search failed (${message}) — showing a baseline estimate instead. ${topic.source.sampleNote ?? ''}`;
      return { kind: 'estimated', topic };
    }
  }

  const topic = buildEstimatedTopic(trimmed);
  topic.source.sampleNote = `No Anthropic API key is set, so no live web search was attempted. ${topic.source.sampleNote ?? ''}`;
  return { kind: 'estimated', topic };
}
