import type { SearchHit } from '../lib/search';

interface SearchResultsListProps {
  hits: SearchHit[];
  query: string;
  onSelect: (hit: SearchHit) => void;
}

export function SearchResultsList({ hits, query, onSelect }: SearchResultsListProps) {
  return (
    <div className="results-list">
      <p className="results-count">
        {hits.length} real poll{hits.length === 1 ? '' : 's'} found for “{query}”
      </p>
      {hits.map((hit) => (
        <button key={hit.topic.id} type="button" className="result-item" onClick={() => onSelect(hit)}>
          <span className="result-item-title">{hit.topic.query}</span>
          <span className="result-item-meta">
            {hit.topic.category} · {hit.topic.source.org} · {hit.topic.source.date}
          </span>
          <span className="result-item-snippet">
            {hit.topic.overall.agree}% {hit.topic.agreeLabel.toLowerCase()} · {hit.topic.overall.disagree}%{' '}
            {hit.topic.disagreeLabel.toLowerCase()}
          </span>
        </button>
      ))}
    </div>
  );
}
