export type DimensionKey = 'age' | 'gender' | 'country' | 'region' | 'religion';

export const DIMENSIONS: { key: DimensionKey; label: string }[] = [
  { key: 'age', label: 'Age' },
  { key: 'gender', label: 'Gender' },
  { key: 'country', label: 'Country' },
  { key: 'region', label: 'Region (US)' },
  { key: 'religion', label: 'Religion' },
];

export interface StanceSplit {
  agree: number;
  neutral: number;
  disagree: number;
}

export interface GroupSplit extends StanceSplit {
  group: string;
}

export type Confidence = 'reported' | 'modeled';

export interface Breakdown {
  confidence: Confidence;
  /** Explains exactly which figures are directly sourced vs. illustrative/interpolated. */
  note?: string;
  groups: GroupSplit[];
}

export interface PollSource {
  org: string;
  title: string;
  url: string;
  date: string;
  sampleNote?: string;
}

export interface PollTopic {
  id: string;
  query: string;
  agreeLabel: string;
  neutralLabel: string;
  disagreeLabel: string;
  category: string;
  keywords: string[];
  source: PollSource;
  overall: StanceSplit;
  breakdowns: Partial<Record<DimensionKey, Breakdown>>;
}

/** Distinguishes curated real-topic results, live web-search-grounded results, and fully AI-simulated ones in the UI. */
export type ResultKind = 'real' | 'live' | 'estimated';

export interface PollResult {
  kind: ResultKind;
  topic: PollTopic;
  matchScore?: number;
}
