import Anthropic from '@anthropic-ai/sdk';
import type { DimensionKey, GroupSplit, PollTopic, StanceSplit } from '../data/types';

const MODEL = 'claude-opus-4-8';

const STANCE_SPLIT_SCHEMA = {
  type: 'object',
  properties: {
    agree: { type: 'integer' },
    neutral: { type: 'integer' },
    disagree: { type: 'integer' },
  },
  required: ['agree', 'neutral', 'disagree'],
  additionalProperties: false,
} as const;

const GROUP_SPLIT_SCHEMA = {
  type: 'object',
  properties: {
    group: { type: 'string' },
    agree: { type: 'integer' },
    neutral: { type: 'integer' },
    disagree: { type: 'integer' },
  },
  required: ['group', 'agree', 'neutral', 'disagree'],
  additionalProperties: false,
} as const;

const BREAKDOWN_ARRAY_SCHEMA = { type: 'array', items: GROUP_SPLIT_SCHEMA } as const;

const RESULT_SCHEMA = {
  type: 'object',
  properties: {
    found: {
      type: 'boolean',
      description:
        'true only if you located a real, citable, published poll or survey via web search that answers or closely relates to the query',
    },
    category: { type: 'string' },
    agreeLabel: { type: 'string' },
    neutralLabel: { type: 'string' },
    disagreeLabel: { type: 'string' },
    overall: STANCE_SPLIT_SCHEMA,
    source: {
      type: 'object',
      properties: {
        org: { type: 'string' },
        title: { type: 'string' },
        url: { type: 'string' },
        date: { type: 'string' },
        sampleNote: { type: 'string' },
      },
      required: ['org', 'title', 'url', 'date'],
      additionalProperties: false,
    },
    breakdowns: {
      type: 'object',
      properties: {
        age: BREAKDOWN_ARRAY_SCHEMA,
        gender: BREAKDOWN_ARRAY_SCHEMA,
        country: BREAKDOWN_ARRAY_SCHEMA,
        region: BREAKDOWN_ARRAY_SCHEMA,
        religion: BREAKDOWN_ARRAY_SCHEMA,
      },
      additionalProperties: false,
    },
  },
  required: ['found'],
  additionalProperties: false,
} as const;

const SYSTEM_PROMPT = `You are a research assistant for Poll Finder, an app that shows real public-opinion poll data broken down by demographic.

Use the web_search tool to try to find a REAL, published poll or survey (from a reputable pollster or research organization — Pew Research, Gallup, YouGov, Ipsos, KFF, a national statistics agency, a peer-reviewed study, etc.) that answers or closely relates to the user's search.

Rules:
- Only report "found": true if you actually located a genuine, citable source with a real, working URL. Never invent a source, a statistic, or a URL.
- If you cannot find a real poll or survey after searching, return {"found": false} and nothing else.
- When you do find one: map its actual response options onto agree/neutral/disagree percentages that sum to 100, as faithfully as possible to what the source reported.
- "agreeLabel"/"neutralLabel"/"disagreeLabel" should describe the real answer options from the source (not generic "Agree"/"Disagree").
- Only include a breakdown for age, gender, country, region, or religion if the SAME source actually reports that exact crosstab. Do not estimate, model, or invent demographic splits that weren't in the source — omit dimensions you don't have real data for.
- Each breakdown group's label should match how the source itself labels that group.
- "source" must include the real organization name, the real title of the report/article, the real URL, and the real publication date (year, or year range).
- "category" is a short 2-4 word topic label (e.g. "Criminal justice", "Public policy").`;

export interface LiveSearchResult {
  found: false;
}

export interface LiveSearchSuccess {
  found: true;
  topic: PollTopic;
}

function clampStance(raw: unknown): StanceSplit | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  const agree = Number(r.agree);
  const neutral = Number(r.neutral);
  const disagree = Number(r.disagree);
  if (![agree, neutral, disagree].every((n) => Number.isFinite(n) && n >= 0)) return null;
  const total = agree + neutral + disagree;
  if (total <= 0) return null;
  const scale = 100 / total;
  const a = Math.round(agree * scale);
  const n = Math.round(neutral * scale);
  const d = 100 - a - n;
  return { agree: a, neutral: n, disagree: Math.max(0, d) };
}

function clampGroups(raw: unknown): GroupSplit[] | null {
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const groups: GroupSplit[] = [];
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const group = String((item as Record<string, unknown>).group ?? '').trim();
    const stance = clampStance(item);
    if (!group || !stance) continue;
    groups.push({ group, ...stance });
  }
  return groups.length > 0 ? groups : null;
}

function isValidUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  try {
    const u = new URL(value);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Calls Claude directly from the browser with the caller's own API key, using the
 * web_search server tool to try to find a real, cited poll for a query that didn't
 * match the curated dataset. Returns { found: false } rather than fabricating data
 * if no real source turns up.
 */
export async function fetchLiveResult(apiKey: string, rawQuery: string): Promise<LiveSearchResult | LiveSearchSuccess> {
  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 4096,
    thinking: { type: 'adaptive' },
    output_config: {
      effort: 'medium',
      format: { type: 'json_schema', schema: RESULT_SCHEMA },
    },
    tools: [{ type: 'web_search_20260209', name: 'web_search', max_uses: 5 }],
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: rawQuery }],
  });

  if (response.stop_reason === 'refusal') {
    throw new Error('The request was declined.');
  }

  const textBlock = [...response.content].reverse().find((b) => b.type === 'text');
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('No response text returned.');
  }

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(textBlock.text);
  } catch {
    throw new Error('Could not parse the response.');
  }

  if (!parsed.found) {
    return { found: false };
  }

  const overall = clampStance(parsed.overall);
  const source = parsed.source as Record<string, unknown> | undefined;
  if (!overall || !source || !isValidUrl(source.url)) {
    return { found: false };
  }

  const rawBreakdowns = (parsed.breakdowns as Record<string, unknown>) ?? {};
  const breakdowns: PollTopic['breakdowns'] = {};
  (['age', 'gender', 'country', 'region', 'religion'] as DimensionKey[]).forEach((dim) => {
    const groups = clampGroups(rawBreakdowns[dim]);
    if (groups) {
      breakdowns[dim] = {
        confidence: 'reported',
        note: 'Found via live web search against the cited source below. Only dimensions the source itself reported are shown — nothing here is modeled or estimated.',
        groups,
      };
    }
  });

  const topic: PollTopic = {
    id: `live:${rawQuery.toLowerCase()}`,
    query: rawQuery,
    agreeLabel: typeof parsed.agreeLabel === 'string' ? parsed.agreeLabel : 'Agree',
    neutralLabel: typeof parsed.neutralLabel === 'string' ? parsed.neutralLabel : 'Neutral / no opinion',
    disagreeLabel: typeof parsed.disagreeLabel === 'string' ? parsed.disagreeLabel : 'Disagree',
    category: typeof parsed.category === 'string' ? parsed.category : 'Live web search',
    keywords: [],
    source: {
      org: String(source.org ?? 'Unknown source'),
      title: String(source.title ?? ''),
      url: String(source.url),
      date: String(source.date ?? ''),
      sampleNote: typeof source.sampleNote === 'string' ? source.sampleNote : undefined,
    },
    overall,
    breakdowns,
  };

  return { found: true, topic };
}
