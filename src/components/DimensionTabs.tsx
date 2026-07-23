import type { DimensionKey } from '../data/types';
import { DIMENSIONS } from '../data/types';

interface DimensionTabsProps {
  available: DimensionKey[];
  active: DimensionKey | 'overall';
  onChange: (key: DimensionKey | 'overall') => void;
}

export function DimensionTabs({ available, active, onChange }: DimensionTabsProps) {
  return (
    <div className="dimension-tabs" role="tablist" aria-label="Break down by">
      <button
        type="button"
        role="tab"
        aria-selected={active === 'overall'}
        className={`dimension-tab ${active === 'overall' ? 'is-active' : ''}`}
        onClick={() => onChange('overall')}
      >
        Overall
      </button>
      {DIMENSIONS.filter((d) => available.includes(d.key)).map((d) => (
        <button
          key={d.key}
          type="button"
          role="tab"
          aria-selected={active === d.key}
          className={`dimension-tab ${active === d.key ? 'is-active' : ''}`}
          onClick={() => onChange(d.key)}
        >
          {d.label}
        </button>
      ))}
    </div>
  );
}
