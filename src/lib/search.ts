import { POLL_TOPICS } from '../data/polls';
import type { PollTopic } from '../data/types';
import { meaningfulTokens, normalize } from './text';

export interface SearchHit {
  topic: PollTopic;
  score: number;
}

/** Below this score, a keyword match is considered too weak to list as a real result. */
export const LIST_THRESHOLD = 3;

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

/** All curated topics that share any keyword overlap with the query, sorted by relevance. */
export function searchPolls(query: string, topics: PollTopic[] = POLL_TOPICS): SearchHit[] {
  const queryNorm = normalize(query);
  if (!queryNorm) return [];
  const queryTokens = meaningfulTokens(query);
  return topics
    .map((topic) => ({ topic, score: scoreTopic(queryNorm, queryTokens, topic) }))
    .filter((hit) => hit.score > 0)
    .sort((a, b) => b.score - a.score);
}

/** Curated hits good enough to list as real search results (like a search engine's results page). */
export function listablePolls(query: string, topics: PollTopic[] = POLL_TOPICS): SearchHit[] {
  return searchPolls(query, topics)
    .filter((hit) => hit.score >= LIST_THRESHOLD)
    .slice(0, 8);
}
