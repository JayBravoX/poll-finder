import { useId, useState } from 'react';
import type { GroupSplit } from '../data/types';

interface DivergingBarChartProps {
  rows: GroupSplit[];
  agreeLabel: string;
  neutralLabel: string;
  disagreeLabel: string;
}

const VIEW_W = 800;
const ROW_H = 40;
const BAR_THICK = 20;
const CENTER_X = VIEW_W / 2;
const PLOT_HALF = 380;
const SCALE = PLOT_HALF / 100;

function roundedPath(x: number, w: number, roundLeft: boolean, roundRight: boolean): string {
  const y = (ROW_H - BAR_THICK) / 2;
  const h = BAR_THICK;
  const r = 4;
  const rl = roundLeft ? r : 0;
  const rr = roundRight ? r : 0;
  const x2 = x + w;
  return [
    `M ${x + rl} ${y}`,
    `H ${x2 - rr}`,
    rr ? `A ${rr} ${rr} 0 0 1 ${x2} ${y + rr}` : `L ${x2} ${y}`,
    `V ${y + h - rr}`,
    rr ? `A ${rr} ${rr} 0 0 1 ${x2 - rr} ${y + h}` : `L ${x2} ${y + h}`,
    `H ${x + rl}`,
    rl ? `A ${rl} ${rl} 0 0 1 ${x} ${y + h - rl}` : `L ${x} ${y + h}`,
    `V ${y + rl}`,
    rl ? `A ${rl} ${rl} 0 0 1 ${x + rl} ${y}` : `L ${x} ${y}`,
    'Z',
  ].join(' ');
}

interface Tip {
  group: string;
  stanceLabel: string;
  value: number;
}

export function DivergingBarChart({ rows, agreeLabel, neutralLabel, disagreeLabel }: DivergingBarChartProps) {
  const [tip, setTip] = useState<Tip | null>(null);
  const [showTable, setShowTable] = useState(false);
  const gid = useId();

  return (
    <div className="chart">
      <div className="chart-legend" role="list" aria-label="Legend">
        <span className="legend-item" role="listitem">
          <span className="swatch swatch-agree" /> {agreeLabel}
        </span>
        <span className="legend-item" role="listitem">
          <span className="swatch swatch-neutral" /> {neutralLabel}
        </span>
        <span className="legend-item" role="listitem">
          <span className="swatch swatch-disagree" /> {disagreeLabel}
        </span>
        <button
          type="button"
          className="table-toggle"
          onClick={() => setShowTable((s) => !s)}
          aria-pressed={showTable}
        >
          {showTable ? 'Show chart' : 'Show table'}
        </button>
      </div>

      {showTable ? (
        <table className="data-table">
          <thead>
            <tr>
              <th scope="col">Group</th>
              <th scope="col">{agreeLabel}</th>
              <th scope="col">{neutralLabel}</th>
              <th scope="col">{disagreeLabel}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.group}>
                <th scope="row">{r.group}</th>
                <td>{r.agree}%</td>
                <td>{r.neutral}%</td>
                <td>{r.disagree}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="chart-rows">
          {rows.map((r, i) => {
            const half = r.neutral / 2;
            const leftStack = r.disagree + half;
            const rightStack = r.agree + half;
            const x0 = CENTER_X - leftStack * SCALE;
            const neutralX = CENTER_X - half * SCALE;
            const agreeX = CENTER_X + half * SCALE;
            const rightEdge = CENTER_X + rightStack * SCALE;

            const gap = 1;
            const disagreeW = Math.max(0, r.disagree * SCALE - (r.disagree > 0 ? gap : 0));
            const neutralW = Math.max(0, r.neutral * SCALE - (r.neutral > 0 ? gap * 2 : 0));
            const agreeW = Math.max(0, r.agree * SCALE - (r.agree > 0 ? gap : 0));

            const rowId = `${gid}-${i}`;

            return (
              <div className="chart-row" key={r.group}>
                <div className="chart-row-label" title={r.group}>
                  {r.group}
                </div>
                <svg
                  className="chart-row-svg"
                  viewBox={`0 0 ${VIEW_W} ${ROW_H}`}
                  preserveAspectRatio="none"
                  role="img"
                  aria-labelledby={`${rowId}-t`}
                >
                  <title id={`${rowId}-t`}>
                    {r.group}: {agreeLabel} {r.agree}%, {neutralLabel} {r.neutral}%, {disagreeLabel} {r.disagree}%
                  </title>
                  <line x1={CENTER_X} y1={2} x2={CENTER_X} y2={ROW_H - 2} className="chart-gridline" />
                  {r.disagree > 0 && (
                    <path
                      d={roundedPath(x0, disagreeW, true, false)}
                      className="bar-disagree"
                      onMouseEnter={() =>
                        setTip({ group: r.group, stanceLabel: disagreeLabel, value: r.disagree })
                      }
                      onMouseLeave={() => setTip(null)}
                    />
                  )}
                  {r.neutral > 0 && (
                    <path
                      d={roundedPath(neutralX, neutralW, false, false)}
                      className="bar-neutral"
                      onMouseEnter={() =>
                        setTip({ group: r.group, stanceLabel: neutralLabel, value: r.neutral })
                      }
                      onMouseLeave={() => setTip(null)}
                    />
                  )}
                  {r.agree > 0 && (
                    <path
                      d={roundedPath(agreeX, agreeW, false, true)}
                      className="bar-agree"
                      onMouseEnter={() =>
                        setTip({ group: r.group, stanceLabel: agreeLabel, value: r.agree })
                      }
                      onMouseLeave={() => setTip(null)}
                    />
                  )}
                  {r.disagree >= 4 && (
                    <text x={x0 - 6} y={ROW_H / 2 + 4} textAnchor="end" className="chart-value-label">
                      {r.disagree}%
                    </text>
                  )}
                  {r.agree >= 4 && (
                    <text x={rightEdge + 6} y={ROW_H / 2 + 4} textAnchor="start" className="chart-value-label">
                      {r.agree}%
                    </text>
                  )}
                </svg>
              </div>
            );
          })}
        </div>
      )}
      {tip && (
        <div className="chart-tooltip" role="status">
          <strong>{tip.group}</strong>
          <span>
            {tip.stanceLabel}: {tip.value}%
          </span>
        </div>
      )}
    </div>
  );
}
