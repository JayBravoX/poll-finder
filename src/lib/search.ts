import { POLL_TOPICS } from '../data/polls';
import type { PollTopic } from '../data/types';
import { meaningfulTokens, normalize } from './text';

export interface SearchHit {
  topic: PollTopic;
  score: number;
}

/** Below this score, a query is considered too weak a match for the curated dataset. */
export const MATCH_THRESHOLD = 3;

function scoreTopic(queryNorm: string, queryTokens: string[], topic: PollTopic): number {
  let score = 0;
  for (const kw of topic.keywords) {
    const kwNorm = normalize(kw);
    if (!kwNorm) continue;
    if (queryNorm.includes(kwNorm)) {
      score += 3 + kwNorm.split(' ').length;
      continue;
    }
    for (const kt of kwNorm.split(' ')) {
      if (kt.length > 2 && queryTokens.includes(kt)) score += 1;
    }
  }
  return score;
}

export function searchPolls(query: string, topics: PollTopic[] = POLL_TOPICS): SearchHit[] {
  const queryNorm = normalize(query);
  if (!queryNorm) return [];
  const queryTokens = meaningfulTokens(query);
  return topics
    .map((topic) => ({ topic, score: scoreTopic(queryNorm, queryTokens, topic) }))
    .filter((hit) => hit.score > 0)
    .sort((a, b) => b.score - a.score);
}

export function findBestMatch(query: string): SearchHit | null {
  const hits = searchPolls(query);
  if (hits.length === 0 || hits[0].score < MATCH_THRESHOLD) return null;
  return hits[0];
}
