import type { FormEvent } from 'react';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

export function SearchBar({ onSearch, initialValue = '' }: SearchBarProps) {
  const [value, setValue] = useState(initialValue);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSearch(value);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='Search a topic or statement, e.g. "Animals are cute"'
        aria-label="Search a topic or statement"
        className="search-input"
      />
      <button type="submit" className="search-button">
        Find polls
      </button>
    </form>
  );
}
