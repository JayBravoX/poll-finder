import type { Breakdown, DimensionKey, GroupSplit, PollTopic, StanceSplit } from '../data/types';
import { normalize } from './text';

/**
 * Fallback generator for queries that don't match the curated real-poll dataset.
 * Every number here is a deterministic, seeded simulation — NOT real survey data.
 * Same query always reproduces the same numbers (so filtering/re-rendering is stable),
 * but nothing here should ever be presented as a genuine poll result.
 */

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

function estimateOverall(queryNorm: string): StanceSplit {
  const rng = rngFor(queryNorm, 'overall');
  const agree = clamp(Math.round(28 + rng() * 48), 5, 90); // 28-76 range
  const remainder = 100 - agree;
  const neutralShare = 0.15 + rng() * 0.35;
  const neutral = Math.round(remainder * neutralShare);
  const disagree = 100 - agree - neutral;
  return { agree, neutral, disagree };
}

function estimateGroup(queryNorm: string, dimension: DimensionKey, group: string, overall: StanceSplit): GroupSplit {
  const rng = rngFor(queryNorm, dimension, group);
  const jitter = Math.round((rng() - 0.5) * 34); // +-17 points
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
  const overall = estimateOverall(queryNorm);

  const breakdowns: Partial<Record<DimensionKey, Breakdown>> = {};
  (Object.keys(DIMENSION_GROUPS) as DimensionKey[]).forEach((dim) => {
    breakdowns[dim] = {
      confidence: 'modeled',
      note: 'AI-simulated — not a real survey. Generated deterministically from your search text; treat as illustrative only.',
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
      sampleNote: 'These numbers are generated, not measured — there is no survey behind them.',
    },
    overall,
    breakdowns,
  };
}
