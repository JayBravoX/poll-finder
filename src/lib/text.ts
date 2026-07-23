export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function tokenize(s: string): string[] {
  const n = normalize(s);
  return n.length ? n.split(' ') : [];
}

const STOPWORDS = new Set([
  'is', 'are', 'the', 'a', 'an', 'to', 'of', 'and', 'or', 'be', 'should',
  'do', 'does', 'in', 'on', 'for', 'than', 'that', 'this', 'it', 'i', 'we',
  'you', 'they', 'more', 'better', 'worse', 'good', 'bad', 'about', 'with',
  'as', 'at', 'by', 'from', 'has', 'have', 'not', 'was', 'were', 'will',
]);

export function meaningfulTokens(s: string): string[] {
  return tokenize(s).filter((t) => !STOPWORDS.has(t) && t.length > 2);
}
