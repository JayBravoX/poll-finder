import type { PollResult } from '../data/types';
import { buildEstimatedTopic } from './estimate';
import { findBestMatch } from './search';

export function resolveQuery(query: string): PollResult | null {
  const trimmed = query.trim();
  if (!trimmed) return null;

  const hit = findBestMatch(trimmed);
  if (hit) {
    return { kind: 'real', topic: hit.topic, matchScore: hit.score };
  }

  return { kind: 'estimated', topic: buildEstimatedTopic(trimmed) };
}
