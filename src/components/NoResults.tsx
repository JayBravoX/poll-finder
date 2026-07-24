interface NoResultsProps {
  query: string;
  hasApiKey: boolean;
}

export function NoResults({ query, hasApiKey }: NoResultsProps) {
  return (
    <div className="no-results">
      <p className="no-results-title">No real polls found for “{query}”.</p>
      <p>
        Poll Finder only shows real, cited public-opinion data — it will not fabricate a chart for a topic that
        hasn't actually been polled.
        {hasApiKey
          ? " Your API key's live web search checked too, but couldn't find a genuine, citable source either."
          : ' Add your own Anthropic API key in Settings to also search the live web for a real poll on this topic.'}
      </p>
      <p>Try a different search, or rephrase — e.g. a public figure's name, or a policy topic.</p>
    </div>
  );
}
