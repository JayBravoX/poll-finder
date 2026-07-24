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
    matched_topic_id: {
      type: 'string',
      description:
        'If the query is a paraphrase, nickname, casual phrasing, or clear variant of one of the curated topics provided, the exact id string of that topic. Otherwise an empty string.',
    },
    query_interpretation: {
      type: 'string',
      description:
        'A neutral one-sentence restatement of the closest real poll question this matches, worded like an actual survey question. Empty string if nothing matches at all.',
    },
    found: {
      type: 'boolean',
      description:
        'Only meaningful when matched_topic_id is empty. true only if you located a real, citable, published poll or survey via web search that answers or closely relates to the query',
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
  required: ['matched_topic_id', 'found'],
  additionalProperties: false,
} as const;

const SYSTEM_PROMPT = `You are a research assistant for Poll Finder, an app that shows real public-opinion poll data broken down by demographic.

You will be given a user's free-text search and a list of curated real-poll topics already in the app's dataset. Do this in order:

STEP 1 — Check the curated list first.
If the query is a paraphrase, nickname, casual phrasing, shorthand, or clear variant of one of the curated topics (e.g. "Is Trump good" is clearly asking about the curated topic "Do you approve of the job Donald Trump is doing as president?"), set "matched_topic_id" to that topic's exact id string, set "query_interpretation" to that topic's actual question, and STOP — do not call web_search, do not fill in any other field.

STEP 2 — Only if nothing in the curated list is a reasonable match, set "matched_topic_id" to "" and use the web_search tool to try to find a REAL, published poll or survey (from a reputable pollster or research organization — Pew Research, Gallup, YouGov, Ipsos, KFF, a national statistics agency, a peer-reviewed study, etc.) that answers or closely relates to the query.

Rules for step 2:
- Only report "found": true if you actually located a genuine, citable source with a real, working URL. Never invent a source, a statistic, or a URL.
- If you cannot find a real poll or survey after searching, return "found": false and set "query_interpretation" to "".
- When you do find one: map its actual response options onto agree/neutral/disagree percentages that sum to 100, as faithfully as possible to what the source reported.
- "agreeLabel"/"neutralLabel"/"disagreeLabel" should describe the real answer options from the source (not generic "Agree"/"Disagree").
- Only include a breakdown for age, gender, country, region, or religion if the SAME source actually reports that exact crosstab. Do not estimate, model, or invent demographic splits that weren't in the source — omit dimensions you don't have real data for.
- Each breakdown group's label should match how the source itself labels that group.
- "source" must include the real organization name, the real title of the report/article, the real URL, and the real publication date (year, or year range).
- "category" is a short 2-4 word topic label (e.g. "Criminal justice", "Public policy").
- Set "query_interpretation" to a one-sentence neutral restatement of the poll question the source actually asked.`;

export type LiveOutcome =
  | { kind: 'matched'; topicId: string; queryInterpretation: string }
  | { kind: 'found'; topic: PollTopic }
  | { kind: 'none' };

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
 * Calls Claude directly from the browser with the caller's own API key. First asks it to
 * match the query against the curated topic list (handles paraphrases/nicknames/casual
 * phrasing the local keyword search misses), and only if nothing matches, uses the
 * web_search server tool to try to find a real, cited external poll. Never fabricates
 * a source or numbers — returns { kind: 'none' } when nothing real turns up either way.
 */
export async function resolveViaAI(
  apiKey: string,
  rawQuery: string,
  curatedTopics: Pick<PollTopic, 'id' | 'query' | 'category'>[],
): Promise<LiveOutcome> {
  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });

  const topicList = curatedTopics
    .map((t) => `- id="${t.id}" | question="${t.query}" | category="${t.category}"`)
    .join('\n');

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
    messages: [
      {
        role: 'user',
        content: `User's search: "${rawQuery}"\n\nCurated topics already in the app (check these first):\n${topicList}`,
      },
    ],
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

  const matchedId = typeof parsed.matched_topic_id === 'string' ? parsed.matched_topic_id.trim() : '';
  if (matchedId && curatedTopics.some((t) => t.id === matchedId)) {
    return {
      kind: 'matched',
      topicId: matchedId,
      queryInterpretation: typeof parsed.query_interpretation === 'string' ? parsed.query_interpretation : '',
    };
  }

  if (!parsed.found) {
    return { kind: 'none' };
  }

  const overall = clampStance(parsed.overall);
  const source = parsed.source as Record<string, unknown> | undefined;
  if (!overall || !source || !isValidUrl(source.url)) {
    return { kind: 'none' };
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

  return { kind: 'found', topic };
}
