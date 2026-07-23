import type { Breakdown, DimensionKey, GroupSplit, PollTopic, StanceSplit } from '../data/types';
import { searchPolls } from './search';
import { normalize } from './text';

/**
 * Fallback generator for queries that don't match the curated real-poll dataset closely
 * enough to be shown as real data. Nothing here is a survey result. But it also isn't
 * arbitrary noise: the overall split is anchored to the closest related topics in the
 * curated dataset (by keyword relevance), so an estimate for an unpolled topic at least
 * starts from a real, comparable base rate instead of a random number. Same query always
 * reproduces the same numbers.
 */

const NEIGHBOR_COUNT = 3;
/** With no related topic in the curated set at all, fall back to this uninformative prior. */
const NO_INFO_PRIOR: StanceSplit = { agree: 45, neutral: 25, disagree: 30 };

function seedFromString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let s = seed;
  return function rng() {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function rngFor(...parts: string[]): () => number {
  return mulberry32(seedFromString(parts.join('|')));
}

export const AGE_GROUPS = ['18-29', '30-49', '50-64', '65+'];
export const GENDER_GROUPS = ['Women', 'Men'];
export const COUNTRY_GROUPS = ['United States', 'United Kingdom', 'Canada', 'Germany', 'India', 'Brazil', 'Japan', 'Nigeria'];
export const REGION_GROUPS = ['Northeast', 'Midwest', 'South', 'West'];
export const RELIGION_GROUPS = ['Christian', 'Religiously unaffiliated', 'Other faiths'];

const DIMENSION_GROUPS: Record<DimensionKey, string[]> = {
  age: AGE_GROUPS,
  gender: GENDER_GROUPS,
  country: COUNTRY_GROUPS,
  region: REGION_GROUPS,
  religion: RELIGION_GROUPS,
};

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}

interface Basis {
  overall: StanceSplit;
  neighborQueries: string[];
}

/** Blends the overall split of the closest related curated topics, weighted by match score. */
function findBasis(rawQuery: string): Basis {
  const hits = searchPolls(rawQuery).slice(0, NEIGHBOR_COUNT);
  if (hits.length === 0) {
    return { overall: NO_INFO_PRIOR, neighborQueries: [] };
  }
  const totalWeight = hits.reduce((sum, h) => sum + h.score, 0);
  const blended = hits.reduce(
    (acc, h) => {
      const w = h.score / totalWeight;
      acc.agree += h.topic.overall.agree * w;
      acc.neutral += h.topic.overall.neutral * w;
      acc.disagree += h.topic.overall.disagree * w;
      return acc;
    },
    { agree: 0, neutral: 0, disagree: 0 },
  );
  return { overall: blended, neighborQueries: hits.map((h) => h.topic.query) };
}

function estimateOverall(queryNorm: string, basis: StanceSplit): StanceSplit {
  const rng = rngFor(queryNorm, 'overall');
  // Small deterministic nudge around the neighbor-blended base rate, since this exact
  // question wasn't actually asked — not a wide-open random draw.
  const nudge = Math.round((rng() - 0.5) * 16); // +-8 points
  const agree = clamp(Math.round(basis.agree) + nudge, 3, 93);
  const remainder = 100 - agree;
  const baseRemainder = basis.neutral + basis.disagree;
  const neutralRatio = baseRemainder > 0 ? basis.neutral / baseRemainder : 0.4;
  const neutral = Math.round(remainder * neutralRatio);
  const disagree = 100 - agree - neutral;
  return { agree, neutral, disagree };
}

function estimateGroup(queryNorm: string, dimension: DimensionKey, group: string, overall: StanceSplit): GroupSplit {
  const rng = rngFor(queryNorm, dimension, group);
  const jitter = Math.round((rng() - 0.5) * 30); // +-15 points of illustrative demographic spread
  const agree = clamp(overall.agree + jitter, 4, 92);
  const remainder = 100 - agree;
  const baseRemainder = overall.neutral + overall.disagree;
  const neutralRatio = baseRemainder > 0 ? overall.neutral / baseRemainder : 0.3;
  const neutral = Math.round(remainder * neutralRatio);
  const disagree = 100 - agree - neutral;
  return { group, agree, neutral, disagree };
}

export function buildEstimatedTopic(rawQuery: string): PollTopic {
  const queryNorm = normalize(rawQuery);
  const basis = findBasis(rawQuery);
  const overall = estimateOverall(queryNorm, basis.overall);

  const note =
    basis.neighborQueries.length > 0
      ? `No survey asks this exact question. This estimate is anchored to the closest related topics already in our real-poll dataset (${basis.neighborQueries.join('; ')}), then adjusted — it is not a measurement of this specific statement.`
      : 'No related topic exists anywhere in our real-poll dataset, so this starts from a neutral, uninformative baseline rather than any survey data at all. Treat it as illustrative only.';

  const breakdowns: Partial<Record<DimensionKey, Breakdown>> = {};
  (Object.keys(DIMENSION_GROUPS) as DimensionKey[]).forEach((dim) => {
    breakdowns[dim] = {
      confidence: 'modeled',
      note,
      groups: DIMENSION_GROUPS[dim].map((g) => estimateGroup(queryNorm, dim, g, overall)),
    };
  });

  return {
    id: `estimated:${queryNorm}`,
    query: rawQuery,
    agreeLabel: 'Agree',
    neutralLabel: 'Neutral / no opinion',
    disagreeLabel: 'Disagree',
    category: 'AI-simulated estimate',
    keywords: [],
    source: {
      org: 'AI-simulated (no real poll found)',
      title: 'No matching real poll exists in the curated dataset for this search',
      url: '',
      date: 'n/a',
      sampleNote: note,
    },
    overall,
    breakdowns,
  };
}
